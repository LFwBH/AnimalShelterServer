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
  console.log({links})
  res.jsonp({
    body: res.locals.data,
    ...(links
      ? {
          page: {
            first: links.first?._page ? parseInt(links.first._page) : null,
            prev: links.prev?._page ? parseInt(links.prev._page) : null,
            next: links.next?._page ? parseInt(links.next._page) : null,
            last: links.last?._page ? parseInt(links.last._page) : null,
          },
        }
      : {}),
  });
};

server.use(middlewares);
server.use(JsonServer.bodyParser);
server.use(router);
server.listen(PORT, () => console.log(chalk.gray("JSON Server is running!")));
