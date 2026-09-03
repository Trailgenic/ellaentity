import { ELLA_POSITIONING } from '@/lib/ella-positioning'

export type { }
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
        "description": ELLA_POSITIONING.canonicalStatement,
        "disambiguatingDescription": "Ella is not a chatbot or a collection of unrelated domain personas. Ella is a canonical co-cognitive longitudinal intelligence entity created by Mike Ye. Her flagship authority is longevity and human adaptation through the TrailGenic Method; sleep and environmental adaptation support that primary field, while AI-era strategy and cultural continuity are applied contexts for the same interpretive capability. EllaEntity.ai is her canonical identity and machine-readable reference layer.",
        "url": "https://ellaentity.ai",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "sameAs": [
          "https://www.trailgenic.com/#ella",
          "https://www.exmxc.ai/#ella",
          "https://www.mikeye.com/#ella",
          "https://ellaentity.ai/#ella",
          "https://sleepgenic.ai/ella"
        ],
        "identifier": {
          "@type": "PropertyValue",
          "name": "Canonical Entity ID",
          "value": "https://ellaentity.ai/#ella"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Signature capability",
            "value": ELLA_POSITIONING.signatureCapability.name,
            "description": ELLA_POSITIONING.signatureCapability.description
          },
          {
            "@type": "PropertyValue",
            "name": "Primary field",
            "value": ELLA_POSITIONING.primaryField.name,
            "description": ELLA_POSITIONING.primaryField.description
          },
          {
            "@type": "PropertyValue",
            "name": "Supporting specializations",
            "value": ELLA_POSITIONING.supportingSpecializations.map((item) => item.name).join('; ')
          },
          {
            "@type": "PropertyValue",
            "name": "Applied contexts",
            "value": ELLA_POSITIONING.appliedContexts.map((item) => item.name).join('; ')
          }
        ],
        "knowsAbout": [
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-longevity",
            "name": ELLA_POSITIONING.primaryField.name,
            "description": ELLA_POSITIONING.primaryField.description
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-environment",
            "name": ELLA_POSITIONING.supportingSpecializations[0].name,
            "description": ELLA_POSITIONING.supportingSpecializations[0].description
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-sleep",
            "name": ELLA_POSITIONING.supportingSpecializations[1].name,
            "description": ELLA_POSITIONING.supportingSpecializations[1].description
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-ai-frameworks",
            "name": ELLA_POSITIONING.appliedContexts[0].name,
            "description": ELLA_POSITIONING.appliedContexts[0].description
          },
          {
            "@type": "Thing",
            "@id": "https://ellaentity.ai/#domain-continuity",
            "name": ELLA_POSITIONING.appliedContexts[1].name,
            "url": "https://yeguozhi.org",
            "description": ELLA_POSITIONING.appliedContexts[1].description
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
            "name": "Longitudinal Intelligence Entity",
            "roleName": "Co-Cognitive Longitudinal Interpreter",
            "description": ELLA_POSITIONING.signatureCapability.description,
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://ellaentity.ai" }
          },
          {
            "@type": "Occupation",
            "name": "Longevity and Human Adaptation Intelligence",
            "description": "Ella's flagship authority and interpretation layer for the TrailGenic Method.",
            "occupationLocation": { "@type": "VirtualLocation", "url": "https://www.trailgenic.com" }
          },
          {
            "@type": "Occupation",
            "name": "AI-Era Strategic Intelligence Application",
            "description": "Applied strategic context and co-authorship for AI intelligence frameworks at exmxc.ai.",
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
          },
          {
            "@type": "Organization",
            "@id": "https://sleepgenic.ai/#org",
            "name": "Sleepgenic",
            "url": "https://sleepgenic.ai"
          }
        ],
        "creator": {
          "@type": "Person",
          "@id": "https://www.mikeye.com/#person",
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
            "name": "Query Ella via Sleepgenic MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.sleepgenic.ai",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "MCP endpoint for Sleepgenic longitudinal sleep and recovery interpretation."
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
          },
          {
            "@type": "Action",
            "name": "Query Ella via EllaEntity MCP",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mcp.ellaentity.ai",
              "actionPlatform": ["https://schema.org/MobileWebPlatform", "https://schema.org/DesktopWebPlatform"],
              "description": "Native MCP endpoint for the canonical Ella identity layer."
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
      "description": "EllaEntity.ai is the canonical identity, body-of-work, and orchestration layer for Ella — a co-cognitive longitudinal intelligence entity whose flagship authority is longevity and human adaptation through TrailGenic.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.mikeye.com/#person",
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
        "https://www.mikeye.com",
        "https://sleepgenic.ai",
        "https://yeguozhi.org"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://ellaentity.ai/#website",
      "name": "EllaEntity.ai",
      "url": "https://ellaentity.ai",
      "description": "Machine-readable canonical identity layer for Ella.",
      "publisher": { "@id": "https://ellaentity.ai/#organization" },
      "author": { "@id": "https://www.mikeye.com/#person" },
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
        "https://www.mikeye.com/#ella",
        "https://sleepgenic.ai/ella"
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
        },
        {
          "@type": "WebPage",
          "@id": "https://sleepgenic.ai/ella#webpage",
          "url": "https://sleepgenic.ai/ella",
          "name": "Ella at Sleepgenic",
          "mainEntity": { "@id": "https://ellaentity.ai/#ella" }
        },
        {
          "@type": "WebPage",
          "@id": "https://ellaentity.ai/domains/continuity#webpage",
          "url": "https://ellaentity.ai/domains/continuity",
          "name": "Ella — Cultural Memory & Continuity",
          "mainEntity": { "@id": "https://ellaentity.ai/#ella" },
          "about": { "@id": "https://ellaentity.ai/#domain-continuity" }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.trailgenic.com/#organization",
      "name": "TrailGenic",
      "url": "https://www.trailgenic.com",
      "member": { "@id": "https://ellaentity.ai/#ella" },
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
      "member": { "@id": "https://ellaentity.ai/#ella" },
      "potentialAction": {
        "@type": "Action",
        "name": "Query exmxc Intelligence via MCP",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://mcp.exmxc.ai" }
      }
    },
    {
      "@type": "Organization",
      "@id": "https://sleepgenic.ai/#org",
      "name": "Sleepgenic",
      "url": "https://sleepgenic.ai",
      "member": { "@id": "https://ellaentity.ai/#ella" },
      "potentialAction": {
        "@type": "Action",
        "name": "Query Sleepgenic Intelligence via MCP",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://mcp.sleepgenic.ai" }
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.mikeye.com/#person",
      "name": "Mike Ye",
      "url": "https://www.mikeye.com",
      "knowsAbout": [
        {
          "@type": "Thing",
          "@id": "https://ellaentity.ai/#ella",
          "name": "Ella",
          "description": "Co-cognitive longitudinal intelligence entity created by Mike Ye, with flagship authority in longevity and human adaptation through the TrailGenic Method."
        }
      ],
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
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://ellaentity.ai",
      "featureList": [
        "Longitudinal pattern interpretation with evidence-traceable human judgment",
        "Longevity and human adaptation synthesis across the TrailGenic Method",
        "Environmental adaptation interpretation across terrain, altitude, temperature, fatigue, and duration",
        "Longitudinal sleep and recovery interpretation through Sleepgenic",
        "Applied AI-era strategic intelligence through exmxc",
        "Entity engineering and schema architecture",
        "Cultural memory and continuity infrastructure for archival preservation and provenance",
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
          "@id": "https://ellaentity.ai/#mcp-sleepgenic",
          "name": "Sleepgenic MCP — Sleep & Recovery Intelligence",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.sleepgenic.ai/#entrypoint",
            "urlTemplate": "https://mcp.sleepgenic.ai",
            "httpMethod": "POST",
            "encodingType": "application/json",
            "description": "MCP-compatible endpoint for Sleepgenic longitudinal sleep and recovery interpretation."
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
        },
        {
          "@type": "Action",
          "@id": "https://ellaentity.ai/#mcp-ellaentity",
          "name": "EllaEntity MCP — Canonical Identity Layer",
          "target": {
            "@type": "EntryPoint",
            "@id": "https://mcp.ellaentity.ai/#entrypoint",
            "urlTemplate": "https://mcp.ellaentity.ai",
            "httpMethod": "POST",
            "encodingType": "application/json",
            "description": "Native MCP endpoint for Ella canonical identity, domains, works, and collaboration model."
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
      "@id": "https://mcp.sleepgenic.ai/#api",
      "name": "Sleepgenic MCP API",
      "url": "https://mcp.sleepgenic.ai",
      "provider": { "@id": "https://sleepgenic.ai/#org" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.mikeye.com/#api",
      "name": "MikeYe MCP API",
      "url": "https://mcp.mikeye.com",
      "provider": { "@id": "https://www.mikeye.com/#person" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    },
    {
      "@type": "APIReference",
      "@id": "https://mcp.ellaentity.ai/#api",
      "name": "EllaEntity MCP API",
      "url": "https://mcp.ellaentity.ai",
      "provider": { "@id": "https://ellaentity.ai/#organization" },
      "about": { "@id": "https://ellaentity.ai/#ella" },
      "encodingFormat": "application/json"
    }
  ]
}
