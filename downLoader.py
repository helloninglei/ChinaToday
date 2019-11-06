# -*- coding:utf-8 -*-
import json
import traceback

from newspaper import Article
from lxml import etree
from logger import spider_log
from settings import redis_client, NEWS_BRIEF_QUEUE, NEWS_DETAIL_QUEUE


class articleDownLoader:

    def download_article(self, article_url):
        news = {"title": "", "publish_time": "", "publisher": "", "content": ""}
        article = Article(article_url)
        article.download()
        article.parse()
        html = etree.HTML(article.html)
        article_element = html.xpath('//div[contains(@class, "article")]')[0] \
            if len(html.xpath('//div[contains(@class, "article")]')) > 0 \
            else None
        if article_element:
            title_element = article_element.xpath('//h1')
            publish_time_element = article_element.xpath('//div[@class="pages-date"]')
            publisher_element = article_element.xpath('//div[@class="pages-date"]//span')
            content_element = article_element.xpath('//div[@id="UCAP-CONTENT"]')
            if (len(title_element)>0 and len(content_element)>0):
                news["title"] = title_element[0].text.strip()
                news["content"] = etree.tostring(content_element[0]).decode('utf-8')
                news["publish_time"] = publish_time_element[0].text.strip() if len(publish_time_element) > 0  and publish_time_element[0].text else ""
                news["publisher"] = publisher_element[0].text.strip() if len(publisher_element) > 0 and publisher_element[0].text else ""
                spider_log.debug(f"article downloaded: {news['title']}")
                redis_client.lpush(NEWS_DETAIL_QUEUE, json.dumps(news))

    def process(self):
        while True:
            article = json.loads(redis_client.brpop(NEWS_BRIEF_QUEUE)[1])
            try:
                self.download_article(article['link'])
            except Exception:
                spider_log.error(f"download article failed:{traceback.format_exc()}")
