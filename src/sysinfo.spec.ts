import { describe, expect, it, jest } from '@jest/globals';
import * as si from 'systeminformation';
import {
  getCpuInfo,
  getMemoryInfo,
  getOsInfo,
  formatCpuInfo,
  formatMemoryInfo,
  formatOsInfo,
  getSystemInfo,
} from './sysinfo';

// Mock du module systeminformation
jest.mock('systeminformation');

const mockedSi = si as jest.Mocked<typeof si>;

describe('System Information Functions', () => {
  describe('getCpuInfo', () => {
    it('should return CPU information', async () => {
      const mockCpuData: si.Systeminformation.CpuData = {
        manufacturer: 'Intel',
        brand: 'Core i7',
        cores: 8,
        physicalCores: 4,
      } as si.Systeminformation.CpuData;

      mockedSi.cpu.mockResolvedValue(mockCpuData);

      const result = await getCpuInfo();
      expect(result).toEqual(mockCpuData);
      expect(mockedSi.cpu).toHaveBeenCalled();
    });
  });

  describe('getMemoryInfo', () => {
    it('should return memory information', async () => {
      const mockMemData: si.Systeminformation.MemData = {
        total: 16000000000,
        used: 8000000000,
        free: 8000000000,
      } as si.Systeminformation.MemData;

      mockedSi.mem.mockResolvedValue(mockMemData);

      const result = await getMemoryInfo();
      expect(result).toEqual(mockMemData);
      expect(mockedSi.mem).toHaveBeenCalled();
    });
  });

  describe('getOsInfo', () => {
    it('should return OS information', async () => {
      const mockOsData: si.Systeminformation.OsData = {
        distro: 'Windows',
        release: '10',
        platform: 'win32',
        arch: 'x64',
      } as si.Systeminformation.OsData;

      mockedSi.osInfo.mockResolvedValue(mockOsData);

      const result = await getOsInfo();
      expect(result).toEqual(mockOsData);
      expect(mockedSi.osInfo).toHaveBeenCalled();
    });
  });

  describe('formatCpuInfo', () => {
    it('should format CPU information correctly', () => {
      const mockCpu: si.Systeminformation.CpuData = {
        manufacturer: 'Intel',
        brand: 'Core i7-9700K',
        cores: 8,
        physicalCores: 8,
      } as si.Systeminformation.CpuData;

      const result = formatCpuInfo(mockCpu);
      expect(result).toBe('CPU: Intel Core i7-9700K (8 cores, 8 physical)');
    });
  });

  describe('formatMemoryInfo', () => {
    it('should format memory information correctly', () => {
      const mockMem: si.Systeminformation.MemData = {
        total: 16 * 1024 ** 3, // 16 GB
        used: 8 * 1024 ** 3,   // 8 GB
        free: 8 * 1024 ** 3,   // 8 GB
      } as si.Systeminformation.MemData;

      const result = formatMemoryInfo(mockMem);
      expect(result).toBe('Memory: 8.00GB used / 16.00GB total (8.00GB free)');
    });

    it('should handle decimal values correctly', () => {
      const mockMem: si.Systeminformation.MemData = {
        total: 15.5 * 1024 ** 3,
        used: 7.25 * 1024 ** 3,
        free: 8.25 * 1024 ** 3,
      } as si.Systeminformation.MemData;

      const result = formatMemoryInfo(mockMem);
      expect(result).toContain('7.25GB');
      expect(result).toContain('15.50GB');
    });
  });

  describe('formatOsInfo', () => {
    it('should format OS information correctly', () => {
      const mockOs: si.Systeminformation.OsData = {
        distro: 'Windows',
        release: '10',
        platform: 'win32',
        arch: 'x64',
      } as si.Systeminformation.OsData;

      const result = formatOsInfo(mockOs);
      expect(result).toBe('OS: Windows 10 (win32 - x64)');
    });
  });

  describe('getSystemInfo', () => {
    it('should gather and format all system information', async () => {
      const mockCpu: si.Systeminformation.CpuData = {
        manufacturer: 'AMD',
        brand: 'Ryzen 5',
        cores: 6,
        physicalCores: 6,
      } as si.Systeminformation.CpuData;

      const mockMem: si.Systeminformation.MemData = {
        total: 16 * 1024 ** 3,
        used: 10 * 1024 ** 3,
        free: 6 * 1024 ** 3,
      } as si.Systeminformation.MemData;

      const mockOs: si.Systeminformation.OsData = {
        distro: 'Ubuntu',
        release: '22.04',
        platform: 'linux',
        arch: 'x64',
      } as si.Systeminformation.OsData;

      mockedSi.cpu.mockResolvedValue(mockCpu);
      mockedSi.mem.mockResolvedValue(mockMem);
      mockedSi.osInfo.mockResolvedValue(mockOs);

      const result = await getSystemInfo();

      expect(result).toContain('=== System Information ===');
      expect(result).toContain('CPU: AMD Ryzen 5 (6 cores, 6 physical)');
      expect(result).toContain('Memory: 10.00GB used / 16.00GB total (6.00GB free)');
      expect(result).toContain('OS: Ubuntu 22.04 (linux - x64)');
      expect(result).toContain('=========================');
    });
  });
});