import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

//endpoint PUT
//
//
//
// /test-orders/{id}

const requestHeaders = {
  api_key: '1234567890123456',
}

const requestBody = {
  status: 'OPEN',
  courierId: 0,
  customerName: 'string',
  customerPhone: 'string',
  comment: 'string',
  id: 0,
}
test.describe('API Tests for Mocked Order Operations', () => {
  test.describe('PUT Method API Tests for Update an order by providing an order ID', () => {
    test('2.1 put an order with correct id should receive code 200', async ({ request }) => {
      const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
        data: requestBody,
        headers: requestHeaders,
      })
      console.log('response body:', await response.json())
      console.log('response headers:', response.headers())
      expect(response.status()).toBe(StatusCodes.OK)
    })

    test('2.2 put an order with incorrect id should receive code 400', async ({ request }) => {
      const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
        data: requestBody,
        headers: requestHeaders,
      })
      console.log('response body:', await response.json())
      console.log('response headers:', response.headers())
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
    })

    test('2.3 put an order with correct id, but unauthorized should receive code 401', async ({
      request,
    }) => {
      const requestHeaders = {
        api_key: '12345678901234',
      }

      const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10', {
        data: requestBody,
        headers: requestHeaders,
      })
      expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    })

    test('2.4 put an order with correct id, with an error in a path of request url, should receive code 404', async ({
      request,
    }) => {
      const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1/k', {
        data: requestBody,
        headers: requestHeaders,
      })
      expect(response.status()).toBe(StatusCodes.NOT_FOUND)
    })
  })

  // endpoint DELETE
  //
  //
  //
  // /test-orders/{id}

  test.describe('DELETE Method API Tests for Delete an order by providing an order ID', () => {
    test('3.1 delete an order with correct id should receive code 204', async ({ request }) => {
      const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
        data: requestBody,
        headers: requestHeaders,
      })
      console.log('response headers:', response.headers())
      expect(response.status()).toBe(StatusCodes.NO_CONTENT)
    })

    test('3.2 delete an order with incorrect id should receive code 400', async ({ request }) => {
      const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/0', {
        data: requestBody,
        headers: requestHeaders,
      })
      console.log('response body:', await response.json())
      console.log('response headers:', response.headers())
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
    })

    test('3.3 delete an order with correct id, but unauthorized should receive code 401', async ({
      request,
    }) => {
      const requestHeaders = {
        api_key: '12345678901234',
      }
      const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
        data: requestBody,
        headers: requestHeaders,
      })
      expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    })

    test('3.4 delete an order with correct id, with an error in a path of request url, should receive code 404', async ({
      request,
    }) => {
      const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1/k', {
        data: requestBody,
        headers: requestHeaders,
      })
      expect(response.status()).toBe(StatusCodes.NOT_FOUND)
    })
  })

  // endpoint GET
  //
  //
  //
  // /test-orders?username={id}&password={id}

  test.describe('GET Method API Tests for user authentication and an API key retrieval  ', () => {
    test('4.1 successful user authentication and an API key retrieval using valid data, should receive code 200', async ({
      request,
    }) => {
      const response = await request.get(
        'https://backend.tallinn-learning.ee/test-orders?username=1&password=1',
        {
          data: requestBody,
          headers: requestHeaders,
        },
      )
      console.log('response headers:', response.headers())
      expect(response.status()).toBe(StatusCodes.OK)
    })

    test('4.2 unsuccessful user authentication and no API key retrieval using invalid data, should receive code 400', async ({
      request,
    }) => {
      const response = await request.get(
        'https://backend.tallinn-learning.ee/test-orders?username=^1&password=^1',
        {
          data: requestBody,
          headers: requestHeaders,
        },
      )
      console.log('response body:', await response.text())
      console.log('response headers:', response.headers())
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
    })
  })
})
