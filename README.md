# Heirloom

Heirloom is a small personal recipe manager. I've always wanted to build one for myself and now that I'm at [Prisma](https://prisma.io), wanting to try out Prisma 2 in real world was the final push. I hope you enjoy it - the code is probably clowny but hey, you live you learn.

## How is it built

Heirloom is built on the following stack:

- Next.js for frontend and API
- Static rendering  + client side calls to API routes
- Prisma 2 for connecting to a postgres database
- Deployed on Vercel.

## Running Heirloom Locally 

Here are the steps to get this working locally

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:hrescak/useheirloom.git
```


Create a `.env` file in the root directory with the URL to your local database. [Here's a good article](https://www.prisma.io/docs/guides/database-workflows/setting-up-a-database/postgresql) on how to set up a local postgres database.

```
DATABASE_URL='LINK_TO_DATABASE'
```


Install dependencies:

```
yarn install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

### 2. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

## Contributing

Feel free to send out an Issue / Pull Request.

## License

BDS-3 Clause License. [View License](https://github.com/hrescak/useheirloom/blob/master/LICENSE)