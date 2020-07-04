import React, {
  createContext,
  useReducer,
  FunctionComponent,
  useContext,
  useCallback,
} from "react";

import apiClient, { FeedSpot } from "../../api/apiClient";

export interface FeedSpotState {
  feedSpots: FeedSpot[];
  currentSpot?: FeedSpot;
  isFetching: boolean;
  isProcessing: boolean;
  error: string;
}

export interface FeedSpotActions {
  fetchFeedSpots: () => Promise<void>;
  fetchFeedSpot: (spotID: string) => Promise<void>;
  selectSpot: (selectedSpot: FeedSpot) => void;
  clearCurrentSpot: () => void;
  addFeedSpot: (data: FeedSpot) => void;
  saveFeedSpot: (data: Partial<FeedSpot>) => Promise<void>;
}

const FeedSpotStateContext = createContext<FeedSpotState | undefined>(
  undefined
);
const FeedSpotActionsContext = createContext<FeedSpotActions | undefined>(
  undefined
);

const feedSpotReducer = (
  currentState: FeedSpotState,
  action: { type: string; payload?: Partial<FeedSpotState> }
): FeedSpotState => ({ ...currentState, ...action.payload });

const initialState: FeedSpotState = {
  feedSpots: [],
  currentSpot: undefined,
  isFetching: false,
  isProcessing: false,
  error: "",
};

export const FeedSpotProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(feedSpotReducer, initialState);

  const fetchFeedSpots = async () => {
    if (state.feedSpots.length > 0) {
      return;
    }

    dispatch({
      type: "fetchFeedSpotsRequest",
      payload: {
        isFetching: true,
      },
    });
    try {
      const feedSpots = await apiClient.fetchFeedSpots();
      dispatch({
        type: "fetchFeedSpotsSuccess",
        payload: {
          isFetching: false,
          feedSpots,
        },
      });
    } catch (error) {
      dispatch({
        type: "fetchFeedSpotsFailure",
        payload: {
          isFetching: false,
          error: error.message,
        },
      });
    }
  };

  const fetchFeedSpot = async (spotID: string) => {
    if (state.currentSpot) {
      return;
    }

    dispatch({
      type: "fetchFeedSpotRequest",
      payload: {
        isFetching: true,
      },
    });
    try {
      const feedSpot = await apiClient.fetchFeedSpot(spotID);
      dispatch({
        type: "fetchFeedSpotSuccess",
        payload: {
          isFetching: false,
          currentSpot: feedSpot,
        },
      });
    } catch (error) {
      dispatch({
        type: "fetchFeedSpotFailure",
        payload: {
          isFetching: false,
          error: error.message,
        },
      });
    }
  };

  const addFeedSpot = async (data: FeedSpot) => {
    const updatedSpots: FeedSpot[] = JSON.parse(
      JSON.stringify(state.feedSpots)
    );
    const onlyPersisted = updatedSpots.filter((it) => it.id !== "unassigned");
    onlyPersisted.push(data);
    dispatch({
      type: "addFeedSpot",
      payload: {
        feedSpots: onlyPersisted,
      },
    });
  };

  const saveFeedSpot = async (data: Partial<FeedSpot>) => {
    dispatch({
      type: "saveFeedSpotRequest",
      payload: {
        isProcessing: true,
      },
    });
    try {
      const newFeedSpot = await apiClient.createFeedSpot(data);
      const updatedSpots = JSON.parse(JSON.stringify(state.feedSpots));
      updatedSpots.push(newFeedSpot);
      dispatch({
        type: "saveFeedSpotSuccess",
        payload: {
          isProcessing: false,
          feedSpots: updatedSpots,
        },
      });
    } catch (error) {
      dispatch({
        type: "saveFeedSpotFailure",
        payload: {
          isProcessing: false,
          error: error.message,
        },
      });
    }
  };

  const selectSpot = (spot: FeedSpot) => {
    dispatch({
      type: "selectSpot",
      payload: {
        currentSpot: spot,
      },
    });
  };

  const clearCurrentSpot = () => {
    dispatch({
      type: "clearCurrentSpot",
      payload: {
        currentSpot: undefined,
      },
    });
  };

  const actions: FeedSpotActions = {
    fetchFeedSpots: useCallback(fetchFeedSpots, [state.feedSpots]),
    fetchFeedSpot: useCallback(fetchFeedSpot, [state.currentSpot]),
    selectSpot: useCallback(selectSpot, []),
    clearCurrentSpot: useCallback(clearCurrentSpot, []),
    addFeedSpot: useCallback(addFeedSpot, [state.feedSpots]),
    saveFeedSpot: useCallback(saveFeedSpot, [state.feedSpots]),
  };

  return (
    <FeedSpotStateContext.Provider value={state}>
      <FeedSpotActionsContext.Provider value={actions}>
        {children}
      </FeedSpotActionsContext.Provider>
    </FeedSpotStateContext.Provider>
  );
};

export const useFeedSpotState = () => {
  const context = useContext(FeedSpotStateContext);
  if (context === undefined) {
    throw new Error("useFeedSpotState must be used within a FeedSpotProvider");
  }
  return context;
};

export const useFeedSpotActions = () => {
  const context = useContext(FeedSpotActionsContext);
  if (context === undefined) {
    throw new Error(
      "useFeedSpotActions must be used within a FeedSpotProvider"
    );
  }
  return context;
};
