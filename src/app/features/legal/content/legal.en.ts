import type { LegalPageId, LegalText } from '../models/legal';

/** Published English legal copy, transcribed verbatim from the previous `pages/legal-en.ts`. */
export const LEGAL_EN: Record<LegalPageId, LegalText> = {
  legalNotice: {
    title: 'Legal notice',
    blocks: [
      {
        paragraphs: [
          'In accordance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce, the website owner is:',
        ],
        ownerDetails: true,
      },
      {
        heading: 'Terms of use',
        paragraphs: [
          'Access to this site implies acceptance of these terms. Content is informational and is not a binding offer. Prices and specifications are confirmed in each quotation.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Text, designs and trademarks belong to {owner} or its licensors. Open Marine software distributed as open source is governed by its own licence.',
        ],
      },
      {
        heading: 'Navigation safety',
        paragraphs: [
          'Navigation aids do not replace a lookout, official charts or the skipper’s judgment. Users are responsible for the safe navigation of their vessels.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy policy',
    blocks: [
      { paragraphs: ['Data controller: {owner}. Contact: {email}.'] },
      {
        heading: 'Data we process and why',
        paragraphs: [
          'Contact form data (name, email, phone and message) is used to answer your enquiry and, where relevant, prepare a quotation.',
          'If you create an account or place an order, account, shipping and order data is used to manage the purchase, delivery, invoicing and warranty. Stripe processes card payments; we do not store card details.',
        ],
      },
      {
        heading: 'Legal basis and retention',
        paragraphs: [
          'The legal basis is your consent and pre-contractual measures requested by you. We retain data for as long as necessary to respond and for applicable legal periods.',
        ],
      },
      {
        heading: 'Recipients',
        paragraphs: [
          'We do not disclose data to third parties except where legally required or to necessary technical providers, including hosting and email.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can request access, correction, erasure, objection, restriction and portability by writing to {email}. You may also complain to the Spanish Data Protection Agency (aepd.es).',
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie policy',
    blocks: [
      {
        paragraphs: [
          'This website does not use analytics, advertising or tracking cookies. It uses only strictly necessary technical storage:',
        ],
        list: [
          {
            label: 'emb_session',
            text: '(cookie): keeps you signed in; expires after 30 days or when you sign out.',
          },
          { label: 'emb_cart', text: '(browser local storage): remembers items in your basket.' },
        ],
      },
      {
        paragraphs: [
          'Photographs are loaded from Unsplash, which may record your IP address when serving them.',
          'If other types of cookies are introduced, this policy will be updated and consent requested.',
        ],
      },
    ],
  },
  termsOfSale: {
    title: 'Terms of sale',
    blocks: [
      { paragraphs: ['These terms govern purchases from embarcarte.com, whose seller is {owner}.'] },
      {
        heading: 'Orders and prices',
        paragraphs: [
          'Prices are in euros and include applicable VAT. An order is accepted when we send email confirmation. If an item is unavailable, we will notify you and refund the amount paid.',
        ],
      },
      {
        heading: 'Payment methods',
        paragraphs: ['Card payment through Stripe or bank transfer. Transfer orders are prepared after payment is received.'],
      },
      {
        heading: 'Shipping and timing',
        paragraphs: ['We will advise you of shipping or installation costs and timing before preparing the order.'],
      },
      {
        heading: 'Right of withdrawal',
        paragraphs: [
          'Consumers have 14 calendar days from receipt to withdraw without giving a reason by writing to {email}. We will refund within 14 days of receiving the product in its original condition. This does not apply to configured or custom-made products.',
        ],
      },
      {
        heading: 'Warranty',
        paragraphs: ['Products have the three-year legal conformity warranty provided by consumer law.'],
      },
      {
        heading: 'Dispute resolution',
        paragraphs: ['Contact us at {email} or the consumer services in your autonomous community.'],
      },
    ],
  },
};
