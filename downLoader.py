# -*- coding:utf-8 -*-
import time

from newspaper import Article
from lxml import etree

from dataCenter import article_queue
from utils import spider_log


class articleDownLoader:

    def download_article(self, article_url):
        news = {"title": "", "publish_time": "", "publisher": "", "content": ""}
        article = Article(article_url)
        article.download()
        article.parse()
        html = etree.HTML(article.html)
        article_element = html.xpath('//div[contains(@class, "article")]')[0]
        title_element = article_element.xpath('//h1')
        publish_time_element = article_element.xpath('//div[@class="pages-date"]')
        publisher_element = article_element.xpath('//div[@class="pages-date"]')
        content_element = article_element.xpath('//div[@id="UCAP-CONTENT"]')
        if (len(title_element)>0 and len(content_element)>0):
            news["title"] = title_element[0].text.strip()
            news["content"] = etree.tostring(content_element[0]).decode('utf-8')
            news["publish_time"] = publish_time_element[0].text.strip() if len(publish_time_element) > 0 else ""
            news["publisher"] = publisher_element[0].text.strip() if len(publisher_element) > 0 else ""
            spider_log.debug(f"article downloaded: {news['title']}")
            return news

    def process(self):
        while True:
            spider_log.debug(f"article_queue:{article_queue.qsize()}")
            article = article_queue.get(timeout=3)
            try:
                self.download_article(article['link'])
            except Exception as e:
                spider_log.error(f"download article failed:{e}")
