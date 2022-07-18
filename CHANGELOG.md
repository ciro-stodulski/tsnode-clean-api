# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Ongoing Changes]

### Fixed

Fixed name project.

## Changed

Update changelog format by http://keepachangelog.com
Refactoring layer to event and logger.
Update logs in modules.

### Added

Added solution to loggers.
Collection todo.
Create mongoose adapter and mongodb module.
Added resolver and mutation graphql.
Added modulo graphql.
Create apollo server adapter.

## [1.0.0] - 2022-07-12

### Fixed

Adjust errors for cli interface.
Add port in constructor of http module.
interfaces cli and http.

## Changed

refactoring container and cli module.
refactoring service layer.
refactoring cache client to use adapter redis.
refactoring in amqp server to use adapter rabbit mq and resolving issue connections lots.
create service layer and refactoring use cases.

### Added

Added producer notification.
Create client for amqp client to create producer and create adapter rabbit qm.
Added Readme.
Create Dockerfile.
Added env validation.
Create cache.
Added db and migrations to database.
Create server http and consumer for rabbit mq.
Create integration json place holder.
Create client http.
Create error handler http.
Validation body schema for request http.
Module http.
Module cli.
Module and container layer.
Interface layer.
Infra layer.
Entity todo.
Test entity todo.
