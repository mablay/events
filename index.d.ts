declare type Listener = (...args: any[]) => void;
export declare class EventEmitter {
    private listeners;
    addListener(eventName: string, listener: Listener): EventEmitter;
    once(eventName: string, listener: Listener): EventEmitter;
    emit(eventName: string, ...args: any[]): boolean;
    removeListener(eventName: string, listener: Listener): EventEmitter;
    /** Alias for removeListener */
    off(eventName: string, listener: Listener): EventEmitter;
    removeAllListeners(eventName: string): EventEmitter;
    eventNames(): string[];
    listenerCount(eventName: string): number;
}
export {};
//# sourceMappingURL=index.d.ts.map