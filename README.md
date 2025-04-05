# Tengo Lead Dev Case

## Dev Quickstart

1. Clone the repo

```
git clone git@github.com:tender-cc/tech-lead-case.git
cd tech-lead-case
npm install
```

2. Start the server :

```
npm start
```

## Context

This repo contains some code from Tengo that simulates a features we have in the app.
The feature is called "Streams" : our customers have multilple streams, that execute multiple searches on tenders.

In the list of result of the stream, the user can take 2 actions (that we call "Decisions") : to "Analyse" a tender, or to "Reject" it.

Both actions will make the tender disappear from the stream ("zero inbox logic", the user don't need to see those anymore).
We register taken decisions in a DB table named "interactions" (in memory for this exercice), so that we can remove those from the results

This repository mocks backend calls (in `src/shared/infra/axios.ts`)

Warning : this codebase is incomplete (some files were plainly copy/pasted from our codebase). As such, some things might be buggy or useless.


## Tools & libraries used in the project
- We use [Mantine v6](https://v6.mantine.dev/) as a UI component library (DX similar to Material UI)
- We use [Tanstack Query](https://tanstack.com/query/) to handle asynchronous state 
- We use [Vite](https://vite.dev/) to build the app
