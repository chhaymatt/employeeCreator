# employeeCreator <!-- omit in toc -->

> Matthew Chhay's Employee Creator Website
> [Open Live Preview]()

## Preview <!-- omit in toc -->

![Preview of Matthew Chhay's employeeCreator's website]()

## Table of Contents <!-- omit in toc -->

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
    -   [Frontend](#frontend)
    -   [Backend](#backend)
-   [Screenshots](#screenshots)
-   [MVP](#mvp)
-   [Setup](#setup)
    -   [For viewing locally and further development](#for-viewing-locally-and-further-development)
        -   [Front end](#front-end)
        -   [Back end](#back-end)
    -   [For publishing to GitHub Pages after initial setup](#for-publishing-to-github-pages-after-initial-setup)
-   [Tools Used](#tools-used)
-   [Project Status](#project-status)
-   [Room for Improvement](#room-for-improvement)
-   [Acknowledgments](#acknowledgments)
-   [Issues](#issues)

## Introduction

## Features

## Technologies Used

### Frontend

-   React TypeScript with Vite
-   React Router
-   SCSS/CSS

### Backend

-   Java
-   Spring

## Screenshots

![]()
![]()
![]()

## MVP

-
-
-

## Setup

### For viewing locally and further development

1. Git clone this repo `git clone git@github.com:chhaymatt/employeeCreator.git`

#### Front end

1. Run `cd frontend`
2. Run `npm install`
3. Run `npm run dev`

#### Back end

1. Run `cd backend`
2. Run `code .`
3. Change `application.properties` e.g. db name and the username and password
4. Create database in MySQL Workbench `create database "db name"`

### For publishing to GitHub Pages after initial setup

1. Run `cd frontend`
2. Run `bash deploy.sh`

## Tools Used

-   Vite - creating a starting React app.
-   Vitest - for testing.
-   React Router - for navigating to different pages.
-   Prettier - to tidy up code in spacing and structure. [Get Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   Favicon.io - generate a favicon. [Generate favicon](https://favicon.io/favicon-generator/)

## Project Status

Project is ongoing

## Room for Improvement

-

## Acknowledgments

-
-
-

## Issues

-   Treat any numbers with leading zeros as strings: https://stackoverflow.com/questions/27361565/why-is-json-invalid-if-an-integer-begins-with-a-leading-zero#:~:text=A%20leading%200%20indicates%20an,would%20not%20contain%20an%208.
-   How to find what faker outputs are there: https://fakerjs.dev/api/
-   How to create an array of n faker objects: https://stackoverflow.com/questions/42861732/generate-an-array-with-random-data-without-using-a-for-loop

# Backend decisions

-   Single DTO for creating and updating an employee, reduces repetition, no need to compare past values with new values
-   Enums for work types and contract types
