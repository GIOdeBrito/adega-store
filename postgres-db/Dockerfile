# Use PostgresSQL 17 image
FROM postgres:17

# Weird default postgre port
EXPOSE 5432

COPY ./init.sql /docker-entrypoint-initdb.d/

USER postgres

CMD ["postgres"]