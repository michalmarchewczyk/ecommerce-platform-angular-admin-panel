import { SalesState } from '../reducers';
import {
  selectReturnsList,
  selectReturnsState,
  selectSelectedReturn,
  selectSelectedReturnId,
} from './returns.selectors';
import { Return } from '../../../core/api';

describe('Returns Selectors', () => {
  let initialState: SalesState;

  beforeEach(() => {
    initialState = {
      orders: {
        list: [],
        selectedOrderId: null,
      },
      returns: {
        list: [
          {
            id: 1,
            status: 'open',
          } as Return,
        ],
        selectedReturnId: 1,
      },
      payments: {
        list: [],
      },
      deliveries: {
        list: [],
      },
      status: {
        loading: false,
        error: null,
        newOrderId: 1,
      },
    };
  });

  describe('selectReturnsState', () => {
    it('should select the returns state', () => {
      const result = selectReturnsState.projector(initialState);
      expect(result).toEqual(initialState.returns);
    });
  });

  describe('selectReturnsList', () => {
    it('should select the returns list', () => {
      const result = selectReturnsList.projector(initialState.returns);
      expect(result).toEqual(initialState.returns.list);
    });
  });

  describe('selectSelectedReturnId', () => {
    it('should select the selected return id', () => {
      const result = selectSelectedReturnId.projector(initialState.returns);
      expect(result).toEqual(1);
    });
  });

  describe('selectSelectedReturn', () => {
    it('should select the selected return', () => {
      const result = selectSelectedReturn.projector(
        initialState.returns,
        initialState.returns.selectedReturnId,
      );
      expect(result).toEqual(initialState.returns.list[0]);
    });

    it('should return null if no return is selected', () => {
      const result = selectSelectedReturn.projector(initialState.returns, null);
      expect(result).toEqual(null);
    });
  });
});
