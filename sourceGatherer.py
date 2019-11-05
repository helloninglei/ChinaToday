import json
import traceback

from lxml import etree
from newspaper import Article

from logger import spider_log
from settings import redis_client, NEWS_SOURCES_QUEUE, NEWS_BRIEF_QUEUE


class govementNewsGatherer:
    def __init__(self, origin_url):
        redis_client.lpush(NEWS_SOURCES_QUEUE, origin_url)

    def get_article_from_source_url(self, sources_url):
        sources_page = Article(sources_url)
        sources_page.download()
        sources_page.parse()
        html = etree.HTML(sources_page.html)
        articleElementList = html.xpath('//div[@class="news_box"]/div[contains(@class, "list")]//li/h4')
        for articleElement in articleElementList:
            title = articleElement.xpath('a')[0].text
            link = articleElement.xpath('a/@href')[0]
            date = articleElement.xpath('span')[0].text.strip()
            article = {"title": title, "link": link, "date": date}
            redis_client.lpush(NEWS_BRIEF_QUEUE, json.dumps(article))
        next_page_url = html.xpath('//div[contains(@class, "newspage")]/ul//li/a[@class="next"]/@href')
        if len(next_page_url):
            redis_client.lpush(NEWS_SOURCES_QUEUE, next_page_url[0])

    def process(self):
        while True:
            source_url = redis_client.brpop(NEWS_SOURCES_QUEUE)[1].decode()
            try:
                self.get_article_from_source_url(source_url)
            except Exception as e:
                spider_log.error(f"get article source failed:{traceback.format_exc()}")

