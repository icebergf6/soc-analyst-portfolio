export interface ProtocolLayer {
  layerName: string;
  fields: { key: string; value: string; note?: string }[];
}

export interface PcapPacket {
  frameNo: number;
  timeDelta: string;
  source: string;
  dest: string;
  protocol: "TCP" | "TLSv1.3" | "HTTP" | "DNS";
  length: number;
  info: string;
  layers: ProtocolLayer[];
  hexDump: string;
}

export const SANITIZED_PCAP_STREAM: PcapPacket[] = [
  {
    frameNo: 1,
    timeDelta: "0.000000",
    source: "10.20.2.104",
    dest: "198.51.100.180",
    protocol: "TCP",
    length: 66,
    info: "49192 -> 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 WS=256",
    layers: [
      {
        layerName: "Frame 1: 66 bytes on wire (528 bits)",
        fields: [
          { key: "Interface", value: "eth0 (Sanitized TAP)" },
          { key: "Arrival Time", value: "2026-08-20 14:15:30.104921 UTC" },
          { key: "Frame Length", value: "66 bytes" }
        ]
      },
      {
        layerName: "Ethernet II, Src: 00:50:56:a1:2b:4c, Dst: 00:50:56:fe:88:10",
        fields: [
          { key: "Destination", value: "00:50:56:fe:88:10 (Gateway)" },
          { key: "Source", value: "00:50:56:a1:2b:4c (Workstation)" },
          { key: "Type", value: "IPv4 (0x0800)" }
        ]
      },
      {
        layerName: "Internet Protocol Version 4, Src: 10.20.2.104, Dst: 198.51.100.180",
        fields: [
          { key: "Version", value: "4" },
          { key: "Header Length", value: "20 bytes" },
          { key: "Time to Live", value: "128" },
          { key: "Protocol", value: "TCP (6)" }
        ]
      },
      {
        layerName: "Transmission Control Protocol, Src Port: 49192, Dst Port: 443, Seq: 0, Len: 0",
        fields: [
          { key: "Source Port", value: "49192" },
          { key: "Destination Port", value: "443 (HTTPS)" },
          { key: "Flags", value: "0x002 (SYN)", note: "Connection initialization request" },
          { key: "Window Size", value: "64240" }
        ]
      }
    ],
    hexDump: `0000  00 50 56 fe 88 10 00 50  56 a1 2b 4c 08 00 45 00   .PV....PV.+L..E.
0010  00 34 8b 4a 40 00 80 06  e2 19 0a 14 02 68 c6 33   .4.J@........h.3
0020  64 b4 c0 28 01 bb 92 a1  4f 2b 00 00 00 00 80 02   d..(....O+......
0030  fa f0 31 c8 00 00 02 04  05 b4 01 03 03 08 01 01   ..1.............`
  },
  {
    frameNo: 2,
    timeDelta: "0.024102",
    source: "198.51.100.180",
    dest: "10.20.2.104",
    protocol: "TCP",
    length: 66,
    info: "443 -> 49192 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0",
    layers: [
      {
        layerName: "Transmission Control Protocol, Src Port: 443, Dst Port: 49192",
        fields: [
          { key: "Flags", value: "0x012 (SYN, ACK)", note: "Server acknowledged handshake" },
          { key: "Sequence Number", value: "0 (relative)" },
          { key: "Acknowledgment Number", value: "1 (relative)" }
        ]
      }
    ],
    hexDump: `0000  00 50 56 a1 2b 4c 00 50  56 fe 88 10 08 00 45 00   .PV.+L.PV.....E.
0010  00 34 1a 8f 00 00 38 06  92 d4 c6 33 64 b4 0a 14   .4....8....3d...
0020  02 68 01 bb c0 28 41 de  99 81 92 a1 4f 2c 80 12   .h...(A.....O,..`
  },
  {
    frameNo: 3,
    timeDelta: "0.028914",
    source: "10.20.2.104",
    dest: "198.51.100.180",
    protocol: "TLSv1.3",
    length: 517,
    info: "Client Hello, SNI=cdn-update-sync.com, JA3=a0e9f5d64349fb13191bc781f81f42e1",
    layers: [
      {
        layerName: "Transport Layer Security (TLS 1.3 Handshake: Client Hello)",
        fields: [
          { key: "Handshake Type", value: "Client Hello (1)" },
          { key: "Server Name Indication (SNI)", value: "cdn-update-sync.com", note: "Newly registered domain" },
          { key: "JA3 Fingerprint Hash", value: "a0e9f5d64349fb13191bc781f81f42e1", note: "Cobalt Strike Malleable Profile Match" },
          { key: "Cipher Suites Count", value: "16 suites advertised" },
          { key: "Supported Groups", value: "x25519 (0x001d), secp256r1 (0x0017)" }
        ]
      }
    ],
    hexDump: `0000  16 03 01 02 00 01 00 01  fc 03 03 44 91 af 29 e1   ...........D..).
0010  5b 32 89 20 c1 04 91 e0  8a 12 b0 00 20 a0 e9 f5   [2. ........ ...
0020  d6 43 49 fb 13 19 1b c7  81 f8 1f 42 e1 13 01 13   .CI........B....
0030  02 c0 2b c0 2f c0 2c c0  30 00 9e 00 9f 01 00 01   ..+./.,.0.......`
  },
  {
    frameNo: 4,
    timeDelta: "62.140881",
    source: "10.20.2.104",
    dest: "198.51.100.180",
    protocol: "TLSv1.3",
    length: 248,
    info: "Application Data (Encrypted Beacon Heartbeat) [Delta: 62.14s - Jitter 3.5%]",
    layers: [
      {
        layerName: "Encrypted Application Data (C2 Beacon Heartbeat)",
        fields: [
          { key: "Payload Size", value: "192 bytes" },
          { key: "Conversation Delta", value: "62.140881 seconds", note: "60s sleep interval + jitter" },
          { key: "Estimated Jitter", value: "3.5%", note: "Consistent timing signature" }
        ]
      }
    ],
    hexDump: `0000  17 03 03 00 b8 eb 91 a0  44 12 c0 4f 99 2b d1 98   ........D..O.+..
0010  fa 19 88 41 2c fe a1 09  c1 04 88 ff aa 10 20 44   ...A,......... D
0020  44 89 11 b9 20 a1 90 22  45 ee 88 12 aa 00 ff 44   D... .."E......D`
  }
];
