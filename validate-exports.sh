#!/bin/bash

# Simple validation script to check component exports

echo "🔍 Validating component exports..."

# Check if all new components are exported in index files
echo "📁 Checking molecules index..."
grep -q "Popover" src/components/molecules/index.ts && echo "✅ Popover export found" || echo "❌ Popover export missing"
grep -q "Input" src/components/molecules/index.ts && echo "✅ Input export found" || echo "❌ Input export missing"

echo "📁 Checking organisms index..."
grep -q "Modal" src/components/organisms/index.tsx && echo "✅ Modal export found" || echo "❌ Modal export missing"
grep -q "PlanCreationModal" src/components/organisms/index.tsx && echo "✅ PlanCreationModal export found" || echo "❌ PlanCreationModal export missing"

echo "📁 Checking main index..."
grep -q "Modal" src/index.ts && echo "✅ Modal in main export" || echo "❌ Modal missing from main export"
grep -q "Popover" src/index.ts && echo "✅ Popover in main export" || echo "❌ Popover missing from main export"
grep -q "PlanCreationModal" src/index.ts && echo "✅ PlanCreationModal in main export" || echo "❌ PlanCreationModal missing from main export"

echo "📁 Checking component files exist..."
[ -f "src/components/organisms/Modal/Modal.tsx" ] && echo "✅ Modal.tsx exists" || echo "❌ Modal.tsx missing"
[ -f "src/components/molecules/Popover/Popover.tsx" ] && echo "✅ Popover.tsx exists" || echo "❌ Popover.tsx missing"
[ -f "src/components/organisms/PlanCreationModal/PlanCreationModal.tsx" ] && echo "✅ PlanCreationModal.tsx exists" || echo "❌ PlanCreationModal.tsx missing"

echo "✨ Validation complete!"