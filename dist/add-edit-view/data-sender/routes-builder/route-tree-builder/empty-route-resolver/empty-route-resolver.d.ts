export default function (paths: any): {
    path: string;
    redirectTo?: undefined;
} | {
    path: string;
    redirectTo: any;
};
