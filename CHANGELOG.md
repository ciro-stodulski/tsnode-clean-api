# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Ongoing Changes]

### Fixed

Fixed name project.

## Changed

Refactored in container layer add factories in structure
Refactored core layer
Refactored module cli
Update changelog format by http://keepachangelog.com
Refactored layer to event and logger.
Update logs in modules.

### Added

Create adapter commander 
Added solution to loggers.
Collection todo.
Created mongoose adapter and mongodb module.
Added resolver and mutation graphql.
Added modulo graphql.
Created apollo server adapter.

## [1.0.0] - 2022-07-12

### Fixed

Adjust errors for cli interface.
Add port in constructor of http module.
interfaces cli and http.

## Changed

Refactored container and cli module.
Refactored service layer.
Refactored cache client to use adapter redis.
Refactored in amqp server to use adapter rabbit mq and resolving issue connections lots.
Created service layer and refactoring use cases.

### Added

Added producer notification.
Created client for amqp client to create producer and create adapter rabbit qm.
Added Readme.
Created Dockerfile.
Added env validation.
Created cache.
Added db and migrations to database.
Created server http and consumer for rabbit mq.
Created integration json place holder.
Created client http.
Created error handler http.
Validation body schema for request http.
Module http.
Module cli.
Module and container layer.
Interface layer.
Infra layer.
Entity todo.
Test entity todo.
