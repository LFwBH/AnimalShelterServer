import chalk from "chalk";
import JsonServer from "json-server";
import parse from "parse-link-header";

const PORT = 3000;

const middlewares = JsonServer.defaults();
const server = JsonServer.create();
const router = JsonServer.router("build/db.json");

type EnhancedRouter = typeof router & { render: (req: any, res: any) => void };

(router as EnhancedRouter).render = (_, res) => {
  const links = parse(res._headers.link);
  res.jsonp({
    body: res.locals.data,
    ...(links
      ? {
          page: {
            first: parseInt(links.first._page),
            next: parseInt(links.next._page),
            last: parseInt(links.last._page),
          },
        }
      : {}),
  });
};

server.use(middlewares);
server.use(JsonServer.bodyParser);
server.use(router);
server.listen(PORT, () => console.log(chalk.gray("JSON Server is running!")));
