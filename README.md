# Code Panoptes

A multi-perspective AI-powered code analysis tool that uses specialized AI assistants to provide deep insights and actionable improvements for your codebase through layered analysis phases.

## About The Project

CodePanoptes is an innovative code analysis tool that leverages multiple specialized AI assistants to provide comprehensive insights into your codebase. Like its namesake from Greek mythology - a giant with a hundred eyes - CodePanoptes examines your code from multiple perspectives simultaneously.

### Key Features

- **Multi-Layer Analysis**: Two-phase approach for both broad and deep code inspection
- **Multiple AI Perspectives**: Six specialized AI assistants analyzing your code:
    - Clean Code Analyzer
    - SOLID Principles Analyzer
    - Critical Thinker
    - Architectural Analyzer
    - Code Summarizer
    - Dependency Analyzer
- **Deep Context Understanding**: Analyzes dependencies and related files for comprehensive insights
- **Actionable Outputs**: Generates specific todo lists for code improvements
- **Recursive File Analysis**: Automatically traverses through all subdirectories
- **Contextual Improvement Suggestions**: Provides improvements based on full understanding of code relationships

### AI Assistants

Each AI assistant specializes in a specific aspect of code analysis:

1. **Clean Code Analyzer**: Evaluates code readability and maintainability
2. **SOLID Analyzer**: Checks adherence to SOLID principles
3. **Critical Thinker**: Identifies potential logical issues and edge cases
4. **Architectural Analyzer**: Evaluates overall code structure and patterns
5. **Summarizer**: Provides clear, concise code summaries
6. **Dependency Analyzer**: Maps code dependencies and relationships

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn
- Valid API key for the AI service

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FractionalDeveloper/Code-Panoptes.git
```

2. Install dependencies:
```bash
cd Code-Panoptes
npm install
```

3. Configure your API key:
```bash
cp .env.example .env
# Edit .env file with your API key
```

### Basic Usage

1. Start the application:
```bash
npm run dev
```

2. Select your source code directory using the file picker

3. Wait for initial analysis to complete

4. Select specific files for detailed analysis

5. Review the generated insights and todo lists

## How It Works

CodePanoptes operates in two distinct phases:

### Phase 1: Broad Analysis
- Recursively scans all directories
- Registers files with metadata
- Performs initial AI analysis
- Creates preliminary context for each file

### Phase 2: Deep Analysis
- Analyzes selected file in detail
- Includes dependency context
- Generates comprehensive todo list
- Provides specific improvement suggestions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.