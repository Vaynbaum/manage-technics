export class User {
  static of(obj: any): User {
    return new User(
      obj.email ?? '',
      obj.password ?? '',
      obj.lastname ?? '',
      obj.firstname ?? '',
      obj.post ?? '',
      obj.url ?? '',
      obj.id ?? 0
    );
  }
  clone(): User {
    return new User(
      this.email,
      this.password,
      this.lastname,
      this.firstname,
      this.post,
      this.url,
      this.id
    );
  }
  constructor(
    public email: string,
    public password: string,
    public lastname: string,
    public firstname: string,
    public post: string,
    public url?: string,
    public id?: number
  ) {}
}
