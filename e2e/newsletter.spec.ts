import { expect, test } from '@playwright/test';

import { subscribeToNewsletter } from './shared/helpers';

// The subscribe API is server-rendered and not part of the static build the
// tests run against, so its responses are always mocked.
const SUBSCRIBE_API_URL = '/api/subscribe';

test.describe('newsletter form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('subscribes with the given email', async ({ page }) => {
    const requests: unknown[] = [];
    await page.route(SUBSCRIBE_API_URL, (route) => {
      requests.push(route.request().postDataJSON());
      return route.fulfill({ json: { success: true } });
    });

    await subscribeToNewsletter({ page, email: 'reader@example.com' });

    await expect(page.getByText('Subscribed successfully!')).toBeVisible();
    await expect(page.getByLabel('Email address')).toHaveValue('');
    expect(requests).toEqual([{ email: 'reader@example.com' }]);
  });

  test('shows the error returned by the API', async ({ page }) => {
    await page.route(SUBSCRIBE_API_URL, (route) =>
      route.fulfill({
        status: 500,
        json: { success: false, error: 'Something went wrong.' },
      })
    );

    await subscribeToNewsletter({ page, email: 'reader@example.com' });

    await expect(page.getByText('Something went wrong.')).toBeVisible();
    await expect(page.getByLabel('Email address')).toHaveValue(
      'reader@example.com'
    );
  });

  test('shows a generic error when the API is unreachable', async ({
    page,
  }) => {
    await page.route(SUBSCRIBE_API_URL, (route) => route.abort());

    await subscribeToNewsletter({ page, email: 'reader@example.com' });

    await expect(
      page.getByText('Unexpected error. Please try again later.')
    ).toBeVisible();
  });

  test('disables the button while subscribing', async ({ page }) => {
    let respond: () => void = () => {};
    await page.route(
      SUBSCRIBE_API_URL,
      (route) =>
        new Promise<void>((resolve) => {
          respond = () => resolve(route.fulfill({ json: { success: true } }));
        })
    );

    await subscribeToNewsletter({ page, email: 'reader@example.com' });

    await expect(
      page.getByRole('button', { name: 'Subscribing...' })
    ).toBeDisabled();

    respond();

    await expect(
      page.getByRole('button', { name: 'Subscribe', exact: true })
    ).toBeEnabled();
  });

  test('does not submit an invalid email', async ({ page }) => {
    let requestCount = 0;
    await page.route(SUBSCRIBE_API_URL, (route) => {
      requestCount++;
      return route.fulfill({ json: { success: true } });
    });

    await subscribeToNewsletter({ page, email: 'not-an-email' });

    await expect(page.getByText('Subscribed successfully!')).toBeHidden();
    expect(requestCount).toBe(0);
  });
});
