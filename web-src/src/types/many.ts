declare global {
    interface Window {
        clipboardData: DataTransfer;
    }

    interface Event {
        detail: any;
    }

    interface UIEvent {
        canvasX: number;
        canvasY: number;
    }

    interface EventTarget {
        type: string;
        localName: string;
        className: string;
    }
}

export interface ComfyError extends Error {
    details: string;
    fileName?: string;
    node_id?: number;
    node_type?: string;
    traceback: string[];
    exception_message: string;
    extra_info?: {
        [x: string]: any;
    };
}

export interface ComfyPromptError extends Error {
    error: ComfyError;
    response: {
        // This could also be ComfyNodeError[] as an array, rather than a dict,
        // which is potentially an error in ComfyUI's server.py
        node_errors: Record<string, ComfyNodeError>;
        error: ComfyError;
    };
}

// This is also defined in our protofiles
export interface WorkflowStep {
    class_type: string;
    inputs: { [key: string]: any } | undefined;
    _meta?: { title: string };
}

export interface ComfyNodeError {
    class_type: string;
    dependent_outputs: WorkflowStep[];
    errors: ComfyError[];
}

export interface TemplateData {
    templates?: {
        data: string;
    }[];
}
export interface ComfyProgress {
    max: number;
    min: number;
    value: number;
}

export type QueueItem = {
    number: number;
    batchCount: number;
};

export interface ComfyButtonWidget {
    name: string;
    type: 'button';
    value: HTMLButtonElement;
    callback: (value: any) => void;
}

export interface ComfyImageWidget {
    name: string;
    type: 'image';
    last_y: number;
    computedHeight: number;
    value: HTMLImageElement;
    computeSize: () => number[];
    callback: (value: any) => void;
}

export interface ComfyFileWidget {
    name: string;
    type: 'file';
    value: ComfyFile;
    callback: (value: any) => void;
}

export interface ComfyTextWidget {
    name: string;
    type: 'text';
    value: string;
    callback: (value: any) => void;
}

export type ComfyWidget = ComfyImageWidget | ComfyButtonWidget | ComfyFileWidget | ComfyTextWidget;

export interface ComfyFile {
    type: string;
    filename: string;
    subfolder: string;
}

export type ComfyImages = HTMLImageElement[] | ComfyFile[];

export interface SerializedNodeObject {
    imgs?: ComfyImages;
    images?: ComfyImages;
    selectedIndex: number;
    img_paste_mode: string;
    original_imgs?: ComfyImages;
    widgets?: ComfyWidget[] | null;
}

export type ClassMethod<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};
