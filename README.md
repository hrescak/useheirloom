<div align="center">
  ![Heirloom](https://raw.githubusercontent.com/hrescak/useheirloom/f45153db02beed454a67965ff13445dea18e245f/public/images/heirloom.svg)
</div>

# Heirloom

Heirloom is a small personal recipe manager. I've always wanted to build one for myself and now that I'm at [Prisma](https://prisma.io), wanting to try out Prisma 2 in real world was the final push. I hope you enjoy it - the code is probably clowny but hey, you live you learn.

## How do I try it

It's available on [useheirloom.com](https://useheirloom.com) but it's very very early so I didn't make it easy for people to sign up. If you're feeling adventurous, drop me an email at `matej[at]useheirloom.com` and i'll point you to the sign up page. Here's a simple [Sourdough Waffles Recipe](https://useheirloom.com/r/sourdough-waffles) as an example. I won't build a mobile client any time soon but it works pretty well as a Progressive Web App so it runs full-screen when you add it to your home page, which i've found satisfactory for now.

## How is it built

Heirloom is built on the following stack:

- [Next.js](https://nextjs.org) for frontend and API
- Static rendering + client side calls to API routes
- [Prisma 2](https://prisma.io) for connecting to a Postgres database
- Deployed on [Vercel](https://vercel.com).

## How much does it cost to run Heirloom

- check out [This fairly current expenses table](https://github.com/hrescak/useheirloom/blob/master/EXPENSES.MD)

## Contributing

Feel free to send out an Issue / Pull Request.

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

## License

BDS-3 Clause License. [View License](https://github.com/hrescak/useheirloom/blob/master/LICENSE)
