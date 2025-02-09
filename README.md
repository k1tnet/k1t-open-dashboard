# K1T Open dashboard

## How to Use

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `bun`:

```bash
bun i
```

### Run the development server

```bash
bun run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.
