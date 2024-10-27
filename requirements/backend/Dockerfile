FROM  python:3.9.20-alpine3.19

COPY --chmod=666 requirements.txt /
RUN pip3 install -U -r requirements.txt

COPY --chmod=666 api /

COPY --chmod=111 entry.sh /


EXPOSE 8000

CMD ["/entry.sh"]
