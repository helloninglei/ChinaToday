from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor, wait

from dataStorager import Storager
from downLoader import articleDownLoader
from settings import ES_ENDPOINT
from sourceGatherer import govementNewsGatherer

process_executor = ProcessPoolExecutor(10)

origin_source_url = "http://sousuo.gov.cn/column/30611/0.htm"
gatherer = govementNewsGatherer(origin_source_url)
loader = articleDownLoader()
storager = Storager(ES_ENDPOINT)


def main():
    thread_executor = ThreadPoolExecutor(10)
    future1 = thread_executor.submit(gatherer.process)
    future2 = thread_executor.submit(loader.process)
    future3 = thread_executor.submit(storager.process)

    wait([future1, future2, future3])


if __name__ == "__main__":
    main()
