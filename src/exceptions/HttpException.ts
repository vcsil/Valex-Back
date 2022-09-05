class HttpException extends Error {
  code: string;

  message: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
  
export default HttpException;