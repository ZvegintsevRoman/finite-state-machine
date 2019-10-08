class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.states = config.states;
        this.currentState = this.initial;
        this.undoState = [];
        this.redoState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!Object.keys(this.states).includes(state)) {
            throw new Error('Invalid!');
        } else {
            this.undoState.push(this.currentState);
            this.currentState = state;
            this.redoState = [];
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!Object.keys(this.states[this.currentState].transitions).includes(event)) {
            throw new Error('Invalid!');
        } else {
            this.changeState(this.states[this.currentState].transitions[event]);
            this.redoState = [];
        }
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == undefined) {
            return Object.keys(this.states);
        } else {
            return Object.keys(this.states).filter(item => this.states[item].transitions[event]);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this.undoState.length) {
            return false;
        } else {
            this.redoState.push(this.currentState);
            this.currentState = this.undoState.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (!this.redoState.length) {
            return false
        } else {
            this.undoState.push(this.currentState);
            this.currentState = this.redoState.pop();
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoState = [];
        this.redoState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
