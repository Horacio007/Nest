export interface ErrorDBResponse {
    query?:          string;
    parameters?:     Array<number | null | string>;
    driverError?:    ErrorDBResponse;
    code:            string;
    originalError:   OriginalError;
    number:          number;
    lineNumber:      number;
    state:           number;
    class:           number;
    serverName:      string;
    procName:        string;
    precedingErrors: any[];
    name?:           string;
}

export interface OriginalError {
    info: Info;
}

export interface Info {
    name:        string;
    handlerName: string;
    number:      number;
    state:       number;
    class:       number;
    message:     string;
    serverName:  string;
    procName:    string;
    lineNumber:  number;
}
