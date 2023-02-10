import dynamicMiddlewares, {
  addMiddleware,
  removeMiddleware,
  resetMiddlewares,
  allDynamicMiddlewares,
} from '../dynamicMiddlewares';

describe('Test dynamic middleware', () => {
  let additionMiddleware;

  beforeEach(() => {
    additionMiddleware = jest.fn(() => next => action => next(action));
  });

  it('Dynamic middleware is defined', () => {
    expect(dynamicMiddlewares).toBeDefined();
  });

  it('Add dynamic middleware success', () => {
    addMiddleware(additionMiddleware);

    expect(allDynamicMiddlewares.length).toBe(2);
  });

  it('Remove dynamic middleware success', () => {
    addMiddleware(additionMiddleware);
    removeMiddleware(additionMiddleware);

    // cause this variable allDynamicMiddlewares is add in previous cases
    expect(allDynamicMiddlewares.length).toBe(2);
  });

  it('Remove dynamic middleware fail cause not exist', () => {
    addMiddleware(additionMiddleware);
    removeMiddleware(() => next => action => next(action));

    // cause this variable allDynamicMiddlewares is add in previous cases
    expect(allDynamicMiddlewares.length).toBe(3);
  });

  it('Reset all dynamic middleware success', () => {
    resetMiddlewares();

    expect(allDynamicMiddlewares.length).toBe(1);
  });
});
