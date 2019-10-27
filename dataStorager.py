import traceback

import requests

from dataCenter import data_queue
from utils import spider_log


class Storager:
    def __init__(self, endpoint):
        self.endpoint = endpoint

    def save_to_elasticsearch(self, article):
        id = str(hash(article['title'] + article['publish_time']))
        url = f"{self.endpoint}/article/govementNews/{id}/_create"
        res = requests.put(url, json=article, timeout=60)
        if res.status_code == 201:
            spider_log.debug(f"success:{article['title']}")
        else:
            spider_log.debug(f"failed:{article['title']}")

        return res

    def process(self):
        while True:
            article = data_queue.get()
            try:
                self.save_to_elasticsearch(article)
            except Exception:
                spider_log.error(f"save article to elasticsearch failed:{traceback.format_exc()}")
