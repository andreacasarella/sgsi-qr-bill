import {Database, open} from 'sqlite'
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

export class DatabaseManager {

  databaseFile: string;

  constructor(databaseFile: string) {
    this.databaseFile = databaseFile;
  }

  async initialize(){
    const tables = await this.countTables();
    if(tables === 0){
      await this.runSqlFile("./app/resources/db/changelogs/init_database.sql");
    }
  }

  private async openDb():Promise<Database> {
    return open({
      filename: this.databaseFile,
      driver: sqlite3.Database
    })
  }

  private async countTables():Promise<number>{
    const db = await this.openDb();
    const row = await db.get("SELECT count(*) as table_count FROM sqlite_master WHERE type = 'table' AND name not in ('sqlite_master', 'sqlite_sequence')");
    return row?.['table_count'];
  }

  private async runSqlFile(sqlFile: string):Promise<void>{
    const db = await this.openDb();
    const dataSql = fs.readFileSync(sqlFile).toString();
    const dataArr:string[] = dataSql.split(';');
    dataArr.map(async sql => await db.exec(sql))
 }

}
