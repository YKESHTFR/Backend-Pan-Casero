import { Injectable } from '@nestjs/common';
import { IResponse, IResponseList, StatusCode } from '../interceptors/interfaces';

@Injectable()
export class ResponseRequestService {
  /**
   * Devuelve una respuesta de éxito con un mensaje y datos opcionales.
   *
   * @template T - El tipo de datos que se incluirán en la respuesta.
   * @param {string} message - Un mensaje que describe el resultado de la operación.
   * @param {StatusCode} statusCode - Código 201 o 200 que describe el resultado de la operación.
   * @param {T} [data] - Datos opcionales que se incluirán en la respuesta. Puede ser cualquier tipo.
   * @returns {IResponse<T>} - Un objeto de respuesta que incluye el código de estado 201, el mensaje y los datos.
   */
  success<T>(message: string, statusCode: StatusCode, data?: T): IResponse<T> {
    return {
      statusCode,
      message,
      data
    };
  }

  /**
   * Devuelve una respuesta de éxito de una lista con paginación con un mensaje y datos opcionales.
   * @template T - El tipo de datos que se incluirán en la respuesta.
   * @param {string} message - Un mensaje que describe el resultado de la operación.
   * @param length - Cantidad de registros encontrados.
   * @param {T} [list] - Datos opcionales que se incluirán en la respuesta. Puede ser cualquier tipo.
   * @returns {IResponse<T>} - Un objeto de respuesta que incluye el código de estado 200, el mensaje y los datos.
   */
  successList<T>(message: string, length: number, list: T): IResponseList<T> {
    return {
      statusCode: 200,
      message,
      data: {
        length,
        list
      }
    };
  }

  /**
* Devuelve una respuesta información con un mensaje.
*
* @param {string} message - Un mensaje que describe el resultado de la operación.
* @returns {IResponse<void>} - Un objeto de respuesta que incluye el código de estado 204 y el mensaje.
*/
  info(message: string): IResponse<void> {
    return {
      statusCode: 204,
      message
    };
  }

  /**
* Devuelve una respuesta de advertencia con un mensaje.
*
* @param {string} message - Un mensaje que describe el resultado de la operación.
* @returns {IResponse<void>} - Un objeto de respuesta que incluye el código de estado 400 y el mensaje.
*/
  warning(message: string): IResponse<void> {
    return {
      statusCode: 400,
      message
    };
  }

  /**
* Devuelve una respuesta de error con un mensaje.
*
* @param {string} message - Un mensaje que describe el resultado de la operación.
* @returns {IResponse<void>} - Un objeto de respuesta que incluye el código de estado 404 y el mensaje.
*/
  error(message: string): IResponse<void> {
    return {
      statusCode: 404,
      message
    };
  }
}
