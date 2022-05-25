import * as dto from "./dto";

export const types: dto.types = {
    SUCCESS: "success",
    WARNING: "warning",
    MESSAGE: "message",
    ERROR: "error",
};

export const iconSvg: dto.types = {
    SUCCESS: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="16"
        height="16"
    >
        <path
            fill="#95d475"
            d="M18.58,15.14a.75.75,0,0,1-1.29-.77A8.42,8.42,0,0,0,18.5,10,8.5,8.5,0,1,0,10,18.5a8.42,8.42,0,0,0,4.37-1.21.75.75,0,1,1,.77,1.29,10,10,0,1,1,3.44-3.44ZM6.78,9.47l2,2L13.22,7A.75.75,0,0,1,14.28,8l-5,5a.75.75,0,0,1-1.06,0l-2.51-2.5a.74.74,0,0,1-.2-.72.75.75,0,0,1,1.26-.34Zm0,0"
        />
    </svg>`,
    WARNING: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="16"
        height="16"
    >
        <path
            fill="#eebe77"
            d="M10,6.55a.87.87,0,0,1,.87.87v3.5a.87.87,0,1,1-1.74,0V7.42A.87.87,0,0,1,10,6.55Zm-.62,6.37a.88.88,0,0,1,1.46.39.87.87,0,0,1-1.07,1.07.86.86,0,0,1-.61-.61.88.88,0,0,1,.22-.85ZM10,3a.89.89,0,0,0-.75.42L1.86,15.72a.9.9,0,0,0,0,.87A.85.85,0,0,0,2.6,17H17.39a.86.86,0,0,0,.74-.43.87.87,0,0,0,0-.87L10.75,3.39A.88.88,0,0,0,10,3Zm0-1.75a2.6,2.6,0,0,1,2.24,1.27l7.41,12.36a2.59,2.59,0,0,1,0,2.61,2.62,2.62,0,0,1-2.25,1.32H2.59A2.62,2.62,0,0,1,.36,14.84L7.76,2.49A2.6,2.6,0,0,1,10,1.22Zm0,0"
        />
    </svg>`,
    MESSAGE: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="16"
        height="16"
    >
        <path
            fill="#b1b3b8"
            d="M20,8.64c0,4.73-4.37,8.54-9.77,8.64l-.38.42-.07.08c-.18.18-.36.34-.83.76A7.8,7.8,0,0,1,4.57,20a.51.51,0,0,1-.33-.13.53.53,0,0,1-.16-.53.85.85,0,0,1,.09-.22l.21-.27.26-.31.29-.36a2.35,2.35,0,0,0,.63-2,.48.48,0,0,1,.13-.48.49.49,0,0,1,.83.23,3.23,3.23,0,0,1-.79,2.81,1,1,0,0,0-.08.11,6.69,6.69,0,0,0,2.66-1.12c.43-.38.6-.54.75-.69L9.12,17a7.32,7.32,0,0,0,.51-.55.48.48,0,0,1,.37-.17c5,0,9-3.44,9-7.65S15,1,10,1,1,4.44,1,8.64A7.08,7.08,0,0,0,3.61,14a.51.51,0,0,1,.05.71.49.49,0,0,1-.7,0A8.08,8.08,0,0,1,0,8.64C0,3.85,4.49,0,10,0S20,3.85,20,8.64ZM6,7a.5.5,0,0,1,.5-.5h7a.5.5,0,0,1,0,1h-7A.5.5,0,0,1,6,7Zm0,3a.5.5,0,0,1,.5-.5h5a.5.5,0,0,1,0,1h-5A.51.51,0,0,1,6,10Zm0,0"
        />
    </svg>`,
    ERROR: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="16"
        height="16"
    >
        <path
            fill="#f89898"
            d="M14.07,15.06a.67.67,0,0,1-.47-.2L5.4,6.67a.68.68,0,0,1,0-1,.66.66,0,0,1,.94,0l8.2,8.2a.67.67,0,0,1-.47,1.14"
        />
        <path
            fill="#e4b2b2"
            d="M6.37,19.67a.75.75,0,0,1-.26-.05A10,10,0,1,1,20,10.37a10.13,10.13,0,0,1-5.82,9.24.67.67,0,0,1-.55-1.22,8.78,8.78,0,0,0,5-8,8.66,8.66,0,1,0-12,8,.67.67,0,0,1-.26,1.28"
        />
        <path
            fill="#e4b2b2"
            d="M5.85,15.08a.66.66,0,0,1-.47-.19.68.68,0,0,1,0-1L13.6,5.72a.66.66,0,0,1,.94,0,.68.68,0,0,1,0,1L6.32,14.89a.66.66,0,0,1-.47.19"
        />
    </svg>`,
};

export function findTypesKey(val: string): string {
    const currentIndex = Object.values(types).findIndex((item) => item === val);
    return Object.keys(types)[currentIndex];
}