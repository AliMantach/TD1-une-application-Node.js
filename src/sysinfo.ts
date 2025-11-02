import * as si from 'systeminformation';

/**
 * Retrieves CPU information
 * @returns Promise with CPU data
 */
export const getCpuInfo = async (): Promise<si.Systeminformation.CpuData> => {
  return await si.cpu();
};

/**
 * Retrieves memory information
 * @returns Promise with memory data
 */
export const getMemoryInfo = async (): Promise<si.Systeminformation.MemData> => {
  return await si.mem();
};

/**
 * Retrieves operating system information
 * @returns Promise with OS data
 */
export const getOsInfo = async (): Promise<si.Systeminformation.OsData> => {
  return await si.osInfo();
};

/**
 * Formats CPU information into a readable string
 * @param cpu CPU data object
 * @returns Formatted CPU information
 */
export const formatCpuInfo = (cpu: si.Systeminformation.CpuData): string => {
  return `CPU: ${cpu.manufacturer} ${cpu.brand} (${cpu.cores} cores, ${cpu.physicalCores} physical)`;
};

/**
 * Formats memory information into a readable string
 * @param mem Memory data object
 * @returns Formatted memory information
 */
export const formatMemoryInfo = (mem: si.Systeminformation.MemData): string => {
  const totalGB = (mem.total / (1024 ** 3)).toFixed(2);
  const usedGB = (mem.used / (1024 ** 3)).toFixed(2);
  const freeGB = (mem.free / (1024 ** 3)).toFixed(2);
  return `Memory: ${usedGB}GB used / ${totalGB}GB total (${freeGB}GB free)`;
};

/**
 * Formats OS information into a readable string
 * @param os OS data object
 * @returns Formatted OS information
 */
export const formatOsInfo = (os: si.Systeminformation.OsData): string => {
  return `OS: ${os.distro} ${os.release} (${os.platform} - ${os.arch})`;
};

/**
 * Gathers and formats all system information
 * @returns Promise with formatted system information
 */
export const getSystemInfo = async (): Promise<string> => {
  const [cpu, mem, os] = await Promise.all([
    getCpuInfo(),
    getMemoryInfo(),
    getOsInfo(),
  ]);

  const lines = [
    '=== System Information ===',
    formatCpuInfo(cpu),
    formatMemoryInfo(mem),
    formatOsInfo(os),
    '=========================',
  ];

  return lines.join('\n');
};
