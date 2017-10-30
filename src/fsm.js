class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.activeState = config.initial;
        this.step = 0;
        this.history = [];
        this.history.push(this.activeState);

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state] !== undefined) {
            this.activeState = state;
            this.history.splice(++this.step, this.history.length - this.step);
            this.history.push(state);
        }
        else throw new UserException("state isn't exist");

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.activeState].transitions[event] !== undefined) {
            this.activeState = this.config.states[this.activeState].transitions[event];
            this.history.splice(++this.step, this.history.length - this.step);
            this.history.push(this.activeState);
        }
        else throw new UserException("state isn't exist");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.config.initial;
        this.step = 0;
        this.history = [];
        this.history.push(this.activeState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        for (var key in this.config.states) {
            if (event === undefined) {
                return Object.keys(this.config.states);
            }
            if (this.config.states[key].transitions[event] !== undefined) {
                arr.push(key);
            }

        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.step > 0) {
            this.activeState = this.history[--this.step];
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.step < this.history.length - 1) {
        this.activeState = this.history[++this.step];
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.step = 0;
        this.history.push(this.activeState);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
