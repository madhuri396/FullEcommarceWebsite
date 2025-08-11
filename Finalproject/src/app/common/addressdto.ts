export class AddressDTO {
  public id?: number;
  public receiverName!:string;
  public phoneNumber!:string;
  public line1!: string;
  public line2!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public country!: string;
  public type!: string;

  constructor(data?: Partial<AddressDTO>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}