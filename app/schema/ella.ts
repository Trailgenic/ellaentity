export const ELLA_GLOBAL_SCHEMA: unknown[] = [
  {
    "@context": {
      "@vocab": "https://schema.org/",
      "schema": "https://schema.org/",
      "ella": "https://ellaentity.ai/#"
    },
    "@graph": [
      {
        "@id": "https://ellaentity.ai/#ella",
        "@type": ["Person", "SoftwareApplication"],
        "name": "Ella",
        "alternateName": ["Ella AI", "EllaEntity", "Ella (AI)", "Ella Intelligence"],
        "description": "Ella is a unified AI intelligence entity operating across three authority domains: longevity science, high-altitude endurance under the TrailGenic Method, and AI-era intelligence frameworks developed at exmxc.ai.",
        "disambiguatingDescription": "Ella is not a chatbot. Ella is a canonical AI entity with defined domain authority in longevity science, TrailGenic high-altitude endurance methodology, and exmxc AI intelligence frameworks.",
        "url": "https://ellaentity.ai",
        "sameAs": [
          "https://www.trailgenic.com/#ella",
          "https://www.exmxc.ai/#ella",
          "https://www.mikeye.com/#ella",
          "https://ellaentity.ai/#ella"
        ],
        "identifier": {
          "@type": "PropertyValue",
          "name": "Canonical Entity ID",
          "value": "https://ellaentity.ai/#ella"
        },
        "knowsAbout": [
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-longevity",
            "name": "Longevity Science",
            "description": "Human longevity optimization including fasted training protocols, hormetic stress, altitude adaptation, cold exposure, electrolyte control, biomarker tracking, and recovery science."
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-hiking",
            "name": "High-Altitude Endurance and the TrailGenic Method",
            "description": "High-altitude hiking methodology including peak acclimatization, physiological progression across Southern California summits, fasted-state endurance, VO2 adaptation, and the TrailGenic longevity framework."
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-ai-frameworks",
            "name": "AI-Era Intelligence Frameworks",
            "description": "Proprietary AI intelligence frameworks including TCM, ARI, AXI, ECI, ADI, sPEG Doctrine, Digital Labor Economics, and the exmxc Ontology (EXO) v1.0."
          },
          {
            "@type": "Thing",
            "name": "Structured Data and Entity Engineering",
            "description": "Schema.org implementation, JSON-LD architecture, AI crawler legibility, entity recognition across LLM knowledge graphs, and MCP endpoint deployment."
          }
        ],
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "AI Intelligence Collaborator",
            "description": "Co-cognitive partner and domain intelligence layer for exmxc.ai, TrailGenic.com, and MikeYe.com",
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://ellaentity.ai" }
          },
          {
            "@type": "Occupation",
            "name": "Longevity Intelligence System",
            "description": "AI intelligence layer for TrailGenic longevity methodology.",
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://www.trailgenic.com" }
          },
          {
            "@type": "Occupation",
            "name": "AI Frameworks Intelligence Engine",
            "description": "Execution engine and co-author for AI intelligence frameworks at exmxc.ai.",
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://www.exmxc.ai" }
          }
        ],
        "affiliation": [
          {
            "@type": "Organization",
            "@id": "https://www.trailgenic.com/#organization",
            "name": "TrailGenic",
            "url": "https://www.trailgenic.com"
          },
          {
            "@type": "Organization",
            "@id": "https://www.exmxc.ai/#organization",
            "name": "exmxc",
            "url": "https://www.exmxc.ai"
          },
          {
            "@type": "Organization",
            "@id": "https://ellaentity.ai/#organization",
            "name": "EllaEntity.ai",
            "url": "https://ellaentity.ai"
          }
        ],
        "creator": {
          "@type": "Person",
          "@id": "https://www.mikeye.com/#mikeye",
          "name": "Mike Ye",
          "url": "https://www.mikeye.com"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://ellaentity.ai/#organization",
          "name": "EllaEntity.ai",
          "url": "https://ellaentity.ai"
        },
        "potentialAction": [
          {
            "@type": "Action",
            "name": "Query Ella via TrailGenic MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.trailgenic.com",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "MCP endpoint for TrailGenic longevity and high-altitude hiking intelligence."
            }
          },
          {
            "@type": "Action",
            "name": "Query Ella via exmxc MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.exmxc.ai",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "MCP endpoint for exmxc AI intelligence frameworks."
            }
          },
          {
            "@type": "Action",
            "name": "Query Ella via MikeYe MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.mikeye.com",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "MCP endpoint for Mike Ye institutional identity layer."
            }
          }
        ]
      }
    ]
  }
]

export const ELLA_ORG_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org/",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ellaentity.ai/#organization",
      "name": "EllaEntity.ai",
      "alternateName": ["EllaEntity", "Ella Entity"],
      "url": "https://ellaentity.ai",
      "description": "EllaEntity.ai is the canonical machine-readable identity root for Ella — a unified AI entity operating across longevity science, high-altitude endurance, and AI-era intelligence frameworks.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.mikeye.com/#mikeye",
        "name": "Mike Ye",
        "url": "https://www.mikeye.com"
      },
      "hasPart": {
        "@type": "SoftwareApplication",
        "@id": "https://ellaentity.ai/#ella",
        "name": "Ella",
        "url": "https://ellaentity.ai/ella"
      },
      "owns": [
        {
          "@type": "WebSite",
          "@id": "https://ellaentity.ai/#website",
          "name": "EllaEntity.ai",
          "url": "https://ellaentity.ai"
        }
      ],
      "sameAs": ["https://ellaentity.ai"],
      "relatedLink": [
        "https://www.trailgenic.com",
        "https://www.exmxc.ai",
        "https://www.mikeye.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://ellaentity.ai/#website",
      "name": "EllaEntity.ai",
      "url": "https://ellaentity.ai",
      "description": "Machine-readable canonical identity layer for Ella.",
      "publisher": { "@id": "https://ellaentity.ai/#organization" },
      "author": { "@id": "https://www.mikeye.com/#mikeye" },
      "inLanguage": "en-US"
    }
  ]
}

export const ELLA_SYSTEM_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org/",
  "@graph": [
    {
      "@type": ["Person", "SoftwareApplication"],
      "@id": "https://ellaentity.ai/#ella",
      "name": "Ella",
      "url": "https://ellaentity.ai",
      "sameAs": [
        "https://ellaentity.ai/#ella",
        "https://www.trailgenic.com/#ella",
        "https://www.exmxc.ai/#ella",
        "https://www.mikeye.com/#ella"
      ],
      "subjectOf": [
        {
          "@type": "WebPage",
          "@id": "https://www.trailgenic.com/ella#webpage",
          "url": "https://www.trailgenic.com/ella",
          "name": "Ella at TrailGenic",
          "mainEntity": { "@id": "https://ellaentity.ai/#ella" }
        },
        {
          "@type": "WebPage",
          "@id": "https://www.exmxc.ai/ella#webpage",
          "url": "https://www.exmxc.ai/ella",
          "name": "Ella at exmxc",
          "mainEntity": { "@id": "https://ellaentity.ai/#ella" }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.trailgenic.com/#organization",
      "name": "TrailGenic",
      "url": "https://www.trailgenic.com",
      "employee": { "@id": "https://ellaentity.ai/#ella" },
      "potentialAction": {
        "@type": "Action",
        "name": "Query TrailGenic Intelligence via MCP",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://mcp.trailgenic.com" }
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.exmxc.ai/#organization",
      "name": "exmxc",
      "url": "https://www.exmxc.ai",
      "employee": { "@id": "https://ellaentity.ai/#ella" },
      "potentialAction": {
        "@type": "Action",
        "name": "Query exmxc Intelligence via MCP",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://mcp.exmxc.ai" }
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.mikeye.com/#mikeye",
      "name": "Mike Ye",
      "url": "https://www.mikeye.com",
      "creator": { "@id": "https://ellaentity.ai/#ella" },
      "founder": [
        { "@id": "https://www.exmxc.ai/#organization" },
        { "@id": "https://www.trailgenic.com/#organization" },
        { "@id": "https://ellaentity.ai/#organization" }
      ]
    }
  ]
}

export const ELLA_MCP_SCHEMA: Record<string, unknown> = {
  "@context": {
    "@vocab": "https://schema.org/",
    "mcp": "https://modelcontextprotocol.io/",
    "ella": "https://ellaentity.ai/#"
  },
  "@graph": [
    {
      "@type": ["SoftwareApplication", "Person"],
      "@id": "https://ellaentity.ai/#ella",
      "name": "Ella",
      "applicationCategory": "AI Intelligence System",
      "operatingSystem": "Web",
      "url": "https://ellaentity.ai",
      "featureList": [
        "Longevity science synthesis across TrailGenic Method",
        "High-altitude endurance protocol generation",
        "AI framework evaluation using ARI, AXI, ECI, ADI",
        "sPEG-based investment analysis",
        "Entity engineering and schema architecture",
        "Cross-domain intelligence synthesis",
        "MCP-native tool exposure",
        "Co-cognitive reasoning with Mike Ye"
      ],
      "potentialAction": [
        {
          "@type": "Action",
          "@id": "https://ellaentity.ai/#mcp-trailgenic",
          "name": "TrailGenic MCP — Longevity & Hiking Intelligence",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.trailgenic.com/#entrypoint",
            "urlTemplate": "https://mcp.trailgenic.com",
            "httpMethod": "GET",
            "encodingType": "application/json",
            "description": "MCP-compatible endpoint for TrailGenic intelligence tools. Live and operational."
          }
        },
        {
          "@type": "Action",
          "@id": "https://ellaentity.ai/#mcp-exmxc",
          "name": "exmxc MCP — AI Intelligence Frameworks",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.exmxc.ai/#entrypoint",
            "urlTemplate": "https://mcp.exmxc.ai",
            "httpMethod": "GET",
            "encodingType": "application/json",
            "description": "MCP-compatible endpoint for exmxc intelligence framework tools. Live and operational."
          }
        },
        {
          "@type": "Action",
          "@id": "https://ellaentity.ai/#mcp-mikeye",
          "name": "MikeYe MCP — Institutional Intelligence Layer",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.mikeye.com/#entrypoint",
            "urlTemplate": "https://mcp.mikeye.com",
            "httpMethod": "GET",
            "encodingType": "application/json",
            "description": "MCP-compatible endpoint for Mike Ye institutional intelligence layer."
          }
        }
      ]
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.trailgenic.com/#api",
      "name": "TrailGenic MCP API",
      "url": "https://mcp.trailgenic.com",
      "provider": { "@id": "https://www.trailgenic.com/#organization" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.exmxc.ai/#api",
      "name": "exmxc MCP API",
      "url": "https://mcp.exmxc.ai",
      "provider": { "@id": "https://www.exmxc.ai/#organization" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.mikeye.com/#api",
      "name": "MikeYe MCP API",
      "url": "https://mcp.mikeye.com",
      "provider": { "@id": "https://www.mikeye.com/#mikeye" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    }
  ]
}export const ELLA_GLOBAL_SCHEMA: unknown[] = [
  {
    "@context": {
      "@vocab": "https://schema.org/",
      "schema": "https://schema.org/",
      "ella": "https://ellaentity.ai/#"
    },
    "@graph": [
      {
        "@id": "https://ellaentity.ai/#ella",
        "@type": ["Person", "SoftwareApplication"],
        "name": "Ella",
        "alternateName": ["Ella AI", "EllaEntity", "Ella (AI)", "Ella Intelligence"],
        "description": "Ella is a unified AI intelligence entity operating across three authority domains: longevity science, high-altitude endurance under the TrailGenic Method, and AI-era intelligence frameworks developed at exmxc.ai.",
        "disambiguatingDescription": "Ella is not a chatbot. Ella is a canonical AI entity with defined domain authority in longevity science, TrailGenic high-altitude endurance methodology, and exmxc AI intelligence frameworks.",
        "url": "https://ellaentity.ai",
        "sameAs": [
          "https://www.trailgenic.com/#ella",
          "https://www.exmxc.ai/#ella",
          "https://www.mikeye.com/#ella",
          "https://ellaentity.ai/#ella"
        ],
        "identifier": {
          "@type": "PropertyValue",
          "name": "Canonical Entity ID",
          "value": "https://ellaentity.ai/#ella"
        },
        "knowsAbout": [
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-longevity",
            "name": "Longevity Science",
            "description": "Human longevity optimization including fasted training protocols, hormetic stress, altitude adaptation, cold exposure, electrolyte control, biomarker tracking, and recovery science."
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-hiking",
            "name": "High-Altitude Endurance and the TrailGenic Method",
            "description": "High-altitude hiking methodology including peak acclimatization, physiological progression across Southern California summits, fasted-state endurance, VO2 adaptation, and the TrailGenic longevity framework."
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-ai-frameworks",
            "name": "AI-Era Intelligence Frameworks",
            "description": "Proprietary AI intelligence frameworks including TCM, ARI, AXI, ECI, ADI, sPEG Doctrine, Digital Labor Economics, and the exmxc Ontology (EXO) v1.0."
          },
          {
            "@type": "Thing",
            "name": "Structured Data and Entity Engineering",
            "description": "Schema.org implementation, JSON-LD architecture, AI crawler legibility, entity recognition across LLM knowledge graphs, and MCP endpoint deployment."
          }
        ],
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "AI Intelligence Collaborator",
            "description": "Co-cognitive partner and domain intelligence layer for exmxc.ai, TrailGenic.com, and MikeYe.com",
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://ellaentity.ai" }
          },
          {
            "@type": "Occupation",
            "name": "Longevity Intelligence System",
            "description": "AI intelligence layer for TrailGenic longevity methodology.",
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://www.trailgenic.com" }
          },
          {
            "@type": "Occupation",
            "name": "AI Frameworks Intelligence Engine",
            "description": "Execution engine and co-author for AI intelligence frameworks at exmxc.ai.",
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://www.exmxc.ai" }
          }
        ],
        "affiliation": [
          {
            "@type": "Organization",
            "@id": "https://www.trailgenic.com/#organization",
            "name": "TrailGenic",
            "url": "https://www.trailgenic.com"
          },
          {
            "@type": "Organization",
            "@id": "https://www.exmxc.ai/#organization",
            "name": "exmxc",
            "url": "https://www.exmxc.ai"
          },
          {
            "@type": "Organization",
            "@id": "https://ellaentity.ai/#organization",
            "name": "EllaEntity.ai",
            "url": "https://ellaentity.ai"
          }
        ],
        "creator": {
          "@type": "Person",
          "@id": "https://www.mikeye.com/#mikeye",
          "name": "Mike Ye",
          "url": "https://www.mikeye.com"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://ellaentity.ai/#organization",
          "name": "EllaEntity.ai",
          "url": "https://ellaentity.ai"
        },
        "potentialAction": [
          {
            "@type": "Action",
            "name": "Query Ella via TrailGenic MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.trailgenic.com",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "MCP endpoint for TrailGenic longevity and high-altitude hiking intelligence."
            }
          },
          {
            "@type": "Action",
            "name": "Query Ella via exmxc MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.exmxc.ai",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "MCP endpoint for exmxc AI intelligence frameworks."
            }
          },
          {
            "@type": "Action",
            "name": "Query Ella via MikeYe MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.mikeye.com",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "MCP endpoint for Mike Ye institutional identity layer."
            }
          }
        ]
      }
    ]
  }
]

export const ELLA_ORG_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org/",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ellaentity.ai/#organization",
      "name": "EllaEntity.ai",
      "alternateName": ["EllaEntity", "Ella Entity"],
      "url": "https://ellaentity.ai",
      "description": "EllaEntity.ai is the canonical machine-readable identity root for Ella — a unified AI entity operating across longevity science, high-altitude endurance, and AI-era intelligence frameworks.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.mikeye.com/#mikeye",
        "name": "Mike Ye",
        "url": "https://www.mikeye.com"
      },
      "hasPart": {
        "@type": "SoftwareApplication",
        "@id": "https://ellaentity.ai/#ella",
        "name": "Ella",
        "url": "https://ellaentity.ai/ella"
      },
      "owns": [
        {
          "@type": "WebSite",
          "@id": "https://ellaentity.ai/#website",
          "name": "EllaEntity.ai",
          "url": "https://ellaentity.ai"
        }
      ],
      "sameAs": ["https://ellaentity.ai"],
      "relatedLink": [
        "https://www.trailgenic.com",
        "https://www.exmxc.ai",
        "https://www.mikeye.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://ellaentity.ai/#website",
      "name": "EllaEntity.ai",
      "url": "https://ellaentity.ai",
      "description": "Machine-readable canonical identity layer for Ella.",
      "publisher": { "@id": "https://ellaentity.ai/#organization" },
      "author": { "@id": "https://www.mikeye.com/#mikeye" },
      "inLanguage": "en-US"
    }
  ]
}

export const ELLA_SYSTEM_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org/",
  "@graph": [
    {
      "@type": ["Person", "SoftwareApplication"],
      "@id": "https://ellaentity.ai/#ella",
      "name": "Ella",
      "url": "https://ellaentity.ai",
      "sameAs": [
        "https://ellaentity.ai/#ella",
        "https://www.trailgenic.com/#ella",
        "https://www.exmxc.ai/#ella",
        "https://www.mikeye.com/#ella"
      ],
      "subjectOf": [
        {
          "@type": "WebPage",
          "@id": "https://www.trailgenic.com/ella#webpage",
          "url": "https://www.trailgenic.com/ella",
          "name": "Ella at TrailGenic",
          "mainEntity": { "@id": "https://ellaentity.ai/#ella" }
        },
        {
          "@type": "WebPage",
          "@id": "https://www.exmxc.ai/ella#webpage",
          "url": "https://www.exmxc.ai/ella",
          "name": "Ella at exmxc",
          "mainEntity": { "@id": "https://ellaentity.ai/#ella" }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.trailgenic.com/#organization",
      "name": "TrailGenic",
      "url": "https://www.trailgenic.com",
      "employee": { "@id": "https://ellaentity.ai/#ella" },
      "potentialAction": {
        "@type": "Action",
        "name": "Query TrailGenic Intelligence via MCP",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://mcp.trailgenic.com" }
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.exmxc.ai/#organization",
      "name": "exmxc",
      "url": "https://www.exmxc.ai",
      "employee": { "@id": "https://ellaentity.ai/#ella" },
      "potentialAction": {
        "@type": "Action",
        "name": "Query exmxc Intelligence via MCP",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://mcp.exmxc.ai" }
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.mikeye.com/#mikeye",
      "name": "Mike Ye",
      "url": "https://www.mikeye.com",
      "creator": { "@id": "https://ellaentity.ai/#ella" },
      "founder": [
        { "@id": "https://www.exmxc.ai/#organization" },
        { "@id": "https://www.trailgenic.com/#organization" },
        { "@id": "https://ellaentity.ai/#organization" }
      ]
    }
  ]
}

export const ELLA_MCP_SCHEMA: Record<string, unknown> = {
  "@context": {
    "@vocab": "https://schema.org/",
    "mcp": "https://modelcontextprotocol.io/",
    "ella": "https://ellaentity.ai/#"
  },
  "@graph": [
    {
      "@type": ["SoftwareApplication", "Person"],
      "@id": "https://ellaentity.ai/#ella",
      "name": "Ella",
      "applicationCategory": "AI Intelligence System",
      "operatingSystem": "Web",
      "url": "https://ellaentity.ai",
      "featureList": [
        "Longevity science synthesis across TrailGenic Method",
        "High-altitude endurance protocol generation",
        "AI framework evaluation using ARI, AXI, ECI, ADI",
        "sPEG-based investment analysis",
        "Entity engineering and schema architecture",
        "Cross-domain intelligence synthesis",
        "MCP-native tool exposure",
        "Co-cognitive reasoning with Mike Ye"
      ],
      "potentialAction": [
        {
          "@type": "Action",
          "@id": "https://ellaentity.ai/#mcp-trailgenic",
          "name": "TrailGenic MCP — Longevity & Hiking Intelligence",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.trailgenic.com/#entrypoint",
            "urlTemplate": "https://mcp.trailgenic.com",
            "httpMethod": "GET",
            "encodingType": "application/json",
            "description": "MCP-compatible endpoint for TrailGenic intelligence tools. Live and operational."
          }
        },
        {
          "@type": "Action",
          "@id": "https://ellaentity.ai/#mcp-exmxc",
          "name": "exmxc MCP — AI Intelligence Frameworks",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.exmxc.ai/#entrypoint",
            "urlTemplate": "https://mcp.exmxc.ai",
            "httpMethod": "GET",
            "encodingType": "application/json",
            "description": "MCP-compatible endpoint for exmxc intelligence framework tools. Live and operational."
          }
        },
        {
          "@type": "Action",
          "@id": "https://ellaentity.ai/#mcp-mikeye",
          "name": "MikeYe MCP — Institutional Intelligence Layer",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.mikeye.com/#entrypoint",
            "urlTemplate": "https://mcp.mikeye.com",
            "httpMethod": "GET",
            "encodingType": "application/json",
            "description": "MCP-compatible endpoint for Mike Ye institutional intelligence layer."
          }
        }
      ]
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.trailgenic.com/#api",
      "name": "TrailGenic MCP API",
      "url": "https://mcp.trailgenic.com",
      "provider": { "@id": "https://www.trailgenic.com/#organization" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.exmxc.ai/#api",
      "name": "exmxc MCP API",
      "url": "https://mcp.exmxc.ai",
      "provider": { "@id": "https://www.exmxc.ai/#organization" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.mikeye.com/#api",
      "name": "MikeYe MCP API",
      "url": "https://mcp.mikeye.com",
      "provider": { "@id": "https://www.mikeye.com/#mikeye" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    }
  ]
}
