import mongoose from 'mongoose';
import { initPayloadTest } from '../../helpers/configHelpers';
import config from './config';
import payload from '../../../src';
import { RESTClient } from '../../helpers/rest';

const collection = config.collections[0]?.slug;

let client: RESTClient;

describe('collections-graphql', () => {
  beforeAll(async (done) => {
    const { serverURL } = await initPayloadTest({
      __dirname,
      done,
      init: {
        local: false,
      },
    });

    client = new RESTClient(config, { serverURL });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await payload.mongoMemoryServer.stop();
  });

  it('should create', async () => {
    const title = 'hello';

    const { doc } = await client.create({
      slug: collection,
      data: {
        title,
      },
    });

    expect(doc.title).toStrictEqual(title);
  });

  it('should find', async () => {
    const { result } = await client.find({
      slug: collection,
    });

    expect(result.totalDocs).toStrictEqual(1);
  });
});
