import {Organization, PaginatedResults} from "../shared/sgsi-qr-bill-types";

const express = require('express');
const cors = require('cors');
const fp = require("find-free-port")

export class Api {
  api = express();
  port: number | null = null;

  constructor() {
    console.log('Api constructor')

    this.api.use(cors({
      origin: '*'
    }))
  }

  async init() {

    if (!this.port) {
      this.port = await this.findFreePort();

      if (this.port) {
        this.api.listen(this.port);
        console.log('api listening on port ' + this.port)

        const response: PaginatedResults<Organization> = {
          results: [],
          perPage: 20,
          page: 0,
          total: 0
        }
        this.api.get('/api/organizations', (req: any, res: any) => {
          res.send(response)
        });

      } else {
        console.log('port not found')
      }
    }
  }

  async findFreePort(): Promise<number | null> {
    return await fp(4000).then((freePort: any) => {
      console.log('found ' + freePort);
      return freePort[0];
    }).catch((err: any) => {
      console.error(err);
      return null;
    });
  }

}
