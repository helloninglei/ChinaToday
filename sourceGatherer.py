from lxml import etree
from newspaper import Article

from dataCenter import article_queue, source_queue
from utils import spider_log


class govementNewsGatherer:
    def __init__(self, origin_url):
        source_queue.put(origin_url)

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
            article_queue.put(article)
        next_page_url = html.xpath('//div[contains(@class, "newspage")]/ul//li/a[@class="next"]/@href')
        if len(next_page_url):
            source_queue.put(next_page_url[0])

    def process(self):
        while True:
            spider_log.debug(f"source_queue:{source_queue.qsize()}")
            source_url = source_queue.get(timeout=3)
            try:
                self.get_article_from_source_url(source_url)
            except Exception as e:
                spider_log.error(f"get article source failed:{e}")

