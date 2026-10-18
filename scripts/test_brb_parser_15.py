"""Guard against statute cross-references parsed as phantom provisions."""
import unittest
from sync_law_sources import parse_brb

class ParseBrbRegression(unittest.TestCase):
    def test_reference_is_not_paragraph(self):
        html = """<h3>4 kap. Om brott mot frihet och frid</h3>
        <p>4 a § Den som begår gärningar mot närstående.</p>
        <p>1. gärningar enligt</p>
        <p>24 § lagen (1988:688) om kontaktförbud, eller</p>
        <p>2. andra gärningar.</p>
        <p>4 b § Den som förföljer en person.</p>"""
        provisions, _ = parse_brb(html)
        self.assertNotIn("BrB:4:24", provisions)
        self.assertIn("24 § lagen (1988:688)", provisions["BrB:4:4a"])
        self.assertIn("BrB:4:4b", provisions)

if __name__ == "__main__":
    unittest.main()
