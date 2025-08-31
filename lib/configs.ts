const Configs = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  //   timeout: Number(process.env.NEXT_PUBLIC_APP_TIMEOUT),
  //   authToken: "EduAdminToken",
  //   getAuthorization: () => {
  //     if (typeof window !== "undefined") {
  //       const token = getSession();
  //       return token ? { Authorization: `Bearer ${token}` } : {};
  //     }
  //     return {};
  //   },
  //   blobBaseUrl: "https://affstoragesbx.blob.core.windows.net/carpooling-sandbox",
};

export default Configs;
