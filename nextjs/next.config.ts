import type { NextConfig } from "next";
import os from "os";

// Dynamically get all local IPv4 addresses to ensure dev origins work on LAN
const getLocalIPs = () => {
  const interfaces = os.networkInterfaces();
  const ips = new Set<string>(["192.168.0.100"]);
  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    if (networkInterface) {
      for (const net of networkInterface) {
        // Skip internal (loopback) and non-IPv4 addresses
        if ((net.family === "IPv4" || String(net.family) === "4") && !net.internal) {
          ips.add(net.address);
        }
      }
    }
  }
  return Array.from(ips);
};

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: getLocalIPs(),
};

export default nextConfig;
