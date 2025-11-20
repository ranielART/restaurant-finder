import express, { Response, Request } from "express";

import cors from "cors";
import restaurantRoutes from "./routes/restaurant.route.js";
import { getOnlyRequest, errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://restaurant-finder-nine.vercel.app/"
];

app.use(
  cors({
    origin: (origin: string | undefined, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET'],
    
  })
);

app.use("/api/execute", restaurantRoutes);

//sample route
app.get("/", (req: Request, res: Response) => {
  const asciiArt = `
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                  
PPPPPPPPPPPPPPPPP   IIIIIIIIII     OOOOOOOOO     NNNNNNNN        NNNNNNNNEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR        DDDDDDDDDDDDD      EEEEEEEEEEEEEEEEEEEEEEVVVVVVVV           VVVVVVVV                    AAA               IIIIIIIIII
P::::::::::::::::P  I::::::::I   OO:::::::::OO   N:::::::N       N::::::NE::::::::::::::::::::EE::::::::::::::::::::ER::::::::::::::::R       D::::::::::::DDD   E::::::::::::::::::::EV::::::V           V::::::V                   A:::A              I::::::::I
P::::::PPPPPP:::::P I::::::::I OO:::::::::::::OO N::::::::N      N::::::NE::::::::::::::::::::EE::::::::::::::::::::ER::::::RRRRRR:::::R      D:::::::::::::::DD E::::::::::::::::::::EV::::::V           V::::::V                  A:::::A             I::::::::I
PP:::::P     P:::::PII::::::IIO:::::::OOO:::::::ON:::::::::N     N::::::NEE::::::EEEEEEEEE::::EEE::::::EEEEEEEEE::::ERR:::::R     R:::::R     DDD:::::DDDDD:::::DEE::::::EEEEEEEEE::::EV::::::V           V::::::V                 A:::::::A            II::::::II
  P::::P     P:::::P  I::::I  O::::::O   O::::::ON::::::::::N    N::::::N  E:::::E       EEEEEE  E:::::E       EEEEEE  R::::R     R:::::R       D:::::D    D:::::D E:::::E       EEEEEE V:::::V           V:::::V                 A:::::::::A             I::::I  
  P::::P     P:::::P  I::::I  O:::::O     O:::::ON:::::::::::N   N::::::N  E:::::E               E:::::E               R::::R     R:::::R       D:::::D     D:::::DE:::::E               V:::::V         V:::::V                 A:::::A:::::A            I::::I  
  P::::PPPPPP:::::P   I::::I  O:::::O     O:::::ON:::::::N::::N  N::::::N  E::::::EEEEEEEEEE     E::::::EEEEEEEEEE     R::::RRRRRR:::::R        D:::::D     D:::::DE::::::EEEEEEEEEE      V:::::V       V:::::V                 A:::::A A:::::A           I::::I  
  P:::::::::::::PP    I::::I  O:::::O     O:::::ON::::::N N::::N N::::::N  E:::::::::::::::E     E:::::::::::::::E     R:::::::::::::RR         D:::::D     D:::::DE:::::::::::::::E       V:::::V     V:::::V                 A:::::A   A:::::A          I::::I  
  P::::PPPPPPPPP      I::::I  O:::::O     O:::::ON::::::N  N::::N:::::::N  E:::::::::::::::E     E:::::::::::::::E     R::::RRRRRR:::::R        D:::::D     D:::::DE:::::::::::::::E        V:::::V   V:::::V                 A:::::A     A:::::A         I::::I  
  P::::P              I::::I  O:::::O     O:::::ON::::::N   N:::::::::::N  E::::::EEEEEEEEEE     E::::::EEEEEEEEEE     R::::R     R:::::R       D:::::D     D:::::DE::::::EEEEEEEEEE         V:::::V V:::::V                 A:::::AAAAAAAAA:::::A        I::::I  
  P::::P              I::::I  O:::::O     O:::::ON::::::N    N::::::::::N  E:::::E               E:::::E               R::::R     R:::::R       D:::::D     D:::::DE:::::E                    V:::::V:::::V                 A:::::::::::::::::::::A       I::::I  
  P::::P              I::::I  O::::::O   O::::::ON::::::N     N:::::::::N  E:::::E       EEEEEE  E:::::E       EEEEEE  R::::R     R:::::R       D:::::D    D:::::D E:::::E       EEEEEE        V:::::::::V                 A:::::AAAAAAAAAAAAA:::::A      I::::I  
PP::::::PP          II::::::IIO:::::::OOO:::::::ON::::::N      N::::::::NEE::::::EEEEEEEE:::::EEE::::::EEEEEEEE:::::ERR:::::R     R:::::R     DDD:::::DDDDD:::::DEE::::::EEEEEEEE:::::E         V:::::::V                 A:::::A             A:::::A   II::::::II
P::::::::P          I::::::::I OO:::::::::::::OO N::::::N       N:::::::NE::::::::::::::::::::EE::::::::::::::::::::ER::::::R     R:::::R     D:::::::::::::::DD E::::::::::::::::::::E          V:::::V                 A:::::A               A:::::A  I::::::::I
P::::::::P          I::::::::I   OO:::::::::OO   N::::::N        N::::::NE::::::::::::::::::::EE::::::::::::::::::::ER::::::R     R:::::R     D::::::::::::DDD   E::::::::::::::::::::E           V:::V                 A:::::A                 A:::::A I::::::::I
PPPPPPPPPP          IIIIIIIIII     OOOOOOOOO     NNNNNNNN         NNNNNNNEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR     DDDDDDDDDDDDD      EEEEEEEEEEEEEEEEEEEEEE            VVV                 AAAAAAA                   AAAAAAAIIIIIIIIII
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  
 Applicant: Raniel Art N. Montebon
 Github: https://github.com/ranielART/restaurant-finder
 LinkedIn: https://www.linkedin.com/in/raniel-art-montebon-628114258/
                                                                                                                       
  
  `;

  res.type("text/plain").send(asciiArt);
});

app.use(getOnlyRequest);
app.use(notFoundHandler);
app.use(errorHandler);



export default app;
