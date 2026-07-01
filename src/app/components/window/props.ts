export interface HistoryState {
    history: string[]
    index: number
}

export type HistoryAction =
    | { type: "PUSH"; pathname: string }
    | { type: "BACK" }
    | { type: "FORWARD" }

export function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
    switch (action.type) {
        case "PUSH": {
            if (state.history[state.index] === action.pathname) {
                return state
            }
            const history = [...state.history.slice(0, state.index + 1), action.pathname]
            return {
                history,
                index: history.length - 1,
            }
        }
        case "BACK": {
            if (state.index <= 0) return state
            return {
                ...state,
                index: state.index - 1,
            }
        }
        case "FORWARD": {
            if (state.index >= state.history.length - 1) {
                return state
            }
            return {
                ...state,
                index: state.index + 1,
            }
        }
        default:
            return state
    }
}
