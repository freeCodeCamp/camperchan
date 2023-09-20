import { levels, histories } from "@prisma/client";

class History {
  private _records: histories[] = [];

  public async findUnique(options): Promise<histories | null> {
    return (
      this._records.find((record) => record.userId === options.where.userId) ??
      null
    );
  }

  public async findMany(): Promise<histories[]> {
    return this._records;
  }

  public async delete(options) {
    const index = this._records.findIndex(
      (record) => record.userId === options.where.userId
    );
    if (index === -1) {
      throw new Error("History not found");
    }
    this._records.splice(index, 1);
  }

  public async upsert(options) {
    const exists = await this.findUnique({
      where: { userId: options.where.userId },
    });
    if (exists) {
      for (const key of Object.keys(options.update)) {
        exists[key] = options.update[key];
      }
      return exists;
    }
    this._records.push(options.create);
    return this.findUnique({ where: { userId: options.where.userId } });
  }

  public async update(options) {
    const exists = await this.findUnique({
      where: { userId: options.where.userId },
    });
    if (!exists) {
      throw new Error("User not found");
    }
    for (const key of Object.keys(options.data)) {
      exists[key] = options.data[key];
    }
  }
}

class Level {
  private _records: levels[] = [];

  public async findUnique(options): Promise<levels | null> {
    return (
      this._records.find((record) => record.userId === options.where.userId) ??
      null
    );
  }

  public async findMany(): Promise<levels[]> {
    return this._records;
  }

  public async delete(options) {
    const index = this._records.findIndex(
      (record) => record.userId === options.where.userId
    );
    if (index === -1) {
      throw new Error("Level not found");
    }
    this._records.splice(index, 1);
  }

  public async upsert(options) {
    const exists = await this.findUnique({
      where: { userId: options.where.userId },
    });
    if (exists) {
      for (const key of Object.keys(options.update)) {
        exists[key] = options.update[key];
      }
      return exists;
    }
    this._records.push(options.create);
    return this.findUnique({ where: { userId: options.where.userId } });
  }

  public async update(options) {
    const exists = await this.findUnique({
      where: { userId: options.where.userId },
    });
    if (!exists) {
      throw new Error("User not found");
    }
    for (const key of Object.keys(options.data)) {
      exists[key] = options.data[key];
    }
  }
}

/**
 * Mock database.
 *
 * @class
 */
export class Database {
  private _level: Level;
  private _history: History;

  /**
   * Constructor.
   */
  constructor() {
    this._level = new Level();
  }

  /**
   * Handles the levels property.
   *
   * @type {Level}
   * @public
   */
  public get levels(): Level {
    return this._level;
  }

  /**
   * Handles the histories property.
   *
   * @type {History}
   * @public
   */
  public get histories(): History {
    return this._history;
  }
}
