import logging


general_format = logging.Formatter('%(name)-12s: %(levelname)-8s %(message)s')
detail_format = logging.Formatter('[%(asctime)s - %(pathname)s[line:%(lineno)d] - %(levelname)s: %(message)s]')

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(general_format)


spider_log = logging.getLogger("spider_logger")
spider_log.setLevel(logging.DEBUG)
spider_log.addHandler(stream_handler)

