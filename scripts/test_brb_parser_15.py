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

    def test_backward_section_references_keep_paragraph_complete(self):
        html = """<h3>6 kap. Om sexualbrott</h3>
        <p>4 § Den som begår en gärning mot ett barn ska dömas till ansvar.</p>
        <p>6 § Den som med ett barn och där omständigheterna är sådana som avses i</p>
        <p>4 § andra stycket, ska dömas för en annan gärning enligt denna paragraf.</p>
        <p>10 § Den som begår en gärning enligt föregående stycke.</p>
        <p>10 a § Den som planerar brott enligt</p>
        <p>10 §, döms till ansvar enligt denna bestämmelse.</p>
        <p>11 § Den som begår en annan gärning.</p>
        <p>12 § Den som hänvisar till</p>
        <p>11 § döms till ansvar.</p>
        <p>12 a § Den som hänvisar till</p>
        <p>15 § i detta kapitel skall anses ha gjort så enligt lagen.</p>
        <p>13 § Den som bryter mot lagens bestämmelser döms till böter.</p>"""
        provisions, _ = parse_brb(html)
        self.assertIn("4 § andra stycket", provisions["BrB:6:6"])
        self.assertIn("10 §, döms", provisions["BrB:6:10a"])
        self.assertIn("11 § döms", provisions["BrB:6:12"])
        self.assertIn("BrB:6:13", provisions)
        self.assertIn("15 § i detta kapitel", provisions["BrB:6:12a"])
        self.assertNotIn("BrB:6:15", provisions)

    def test_bare_chapter_reference_keeps_19_14_to_16(self):
        html = """<h3>19 kap. Om brott mot Sveriges säkerhet</h3>
        <p>14 § För försök, förberedelse eller stämpling döms till ansvar enligt</p>
        <p>23 kap.</p>
        <p>15 § Den som medverkar till gärningen döms till ansvar enligt lagen.</p>
        <p>16 § Åtal kräver särskild ordning när detta uttryckligen föreskrivs.</p>
        <h3>20 kap. Om tjänstefel m.m.</h3>
        <p>1 § Den som åsidosätter vad som gäller för uppgiften döms till ansvar.</p>"""
        result, _ = parse_brb(html)
        self.assertIn("23 kap.", result["BrB:19:14"])
        self.assertIn("BrB:19:15", result)
        self.assertIn("BrB:19:16", result)
        self.assertIn("BrB:20:1", result)
        self.assertNotIn("BrB:23:15", result)
if __name__ == "__main__":
    unittest.main()
