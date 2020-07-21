export class TypeConversorUtils {

  public static fromAny<T>(from: any, to: T): T {
    /*
     * Converte um objeto do tipo "any" para um com um tipo específico (o generics).
     * Pode ser utilizado para adicionar métodos em objetos que vem de requests
     */
    if (typeof from === 'string') {
      from = JSON.parse(from);
    }
    Object.keys(from).forEach(property => {
      to[property] = from[property];
    });
    return to;
  }

}
