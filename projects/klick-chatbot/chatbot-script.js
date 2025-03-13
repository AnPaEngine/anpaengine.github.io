document.addEventListener('DOMContentLoaded', function() {
  const chatbox = document.getElementById('chatbox');
  const closeChat = document.getElementById('closeChat');
  const chatboxMessages = document.querySelector('.chatbox-messages');
    
    const categories = [
        { 
            name: "Grundlagen von CloudPBX und VoIP", 
            questions: [
                { question: "Was ist CloudPBX?", answer: "CloudPBX ist ein virtuelles Telefonsystem, das über das Internet betrieben wird. Es bietet die Funktionen einer traditionellen Telefonanlage, aber ohne die Notwendigkeit physischer Hardware vor Ort. Alles wird über die Cloud verwaltet, was Flexibilität und Kosteneinsparungen ermöglicht." },
                { question: "Was ist VoIP?", answer: "VoIP (Voice over Internet Protocol) ist eine Technologie, die es ermöglicht, Sprachkommunikation über das Internet zu übertragen. Anrufe werden in digitale Daten umgewandelt und über das Internet statt über traditionelle Telefonleitungen gesendet." },
                { question: "Wie unterscheiden sich CloudPBX und traditionelle Telefonanlagen?", answer: "Traditionelle Telefonanlagen erfordern teure, wartungsintensive Hardware vor Ort. CloudPBX hingegen läuft über das Internet, erfordert keine physische Infrastruktur und bietet mehr Flexibilität, da sie einfach skaliert und remote verwaltet werden kann." },
                { question: "Warum sollte ich CloudPBX und VoIP verwenden?", answer: "CloudPBX und VoIP bieten Kosteneinsparungen, Flexibilität und Skalierbarkeit. Sie ermöglichen es, von überall zu arbeiten, da die Systeme internetbasiert sind, und bieten erweiterte Funktionen wie Anrufweiterleitung, Voicemail, und Integration mit anderen Business-Tools." },
                { question: "Welche technischen Voraussetzungen gibt es für CloudPBX und VoIP?", answer: "Sie benötigen eine stabile Internetverbindung und geeignete VoIP-Telefone oder Softphones (Software-basierte Telefone). Die Bandbreite sollte ausreichend sein, um eine gute Sprachqualität zu gewährleisten, und es kann hilfreich sein, QoS-Einstellungen (Quality of Service) in Ihrem Netzwerk zu konfigurieren." },
                { question: "Wie sicher ist CloudPBX und VoIP?", answer: "CloudPBX- und VoIP-Systeme sind in der Regel sehr sicher, da sie Verschlüsselungstechnologien und sichere Rechenzentren verwenden. Viele Anbieter bieten zusätzliche Sicherheitsfunktionen wie Firewalls, Schutz vor DDoS-Angriffen und sichere Authentifizierungsmethoden." },
                { question: "Wie wird ein Anruf über VoIP vermittelt?", answer: "Bei einem VoIP-Anruf wird Ihre Stimme in digitale Datenpakete umgewandelt, die über das Internet an den Empfänger gesendet werden. Der Empfänger erhält die Daten, die dann wieder in Sprache umgewandelt werden. Dieser Prozess passiert in Echtzeit, sodass Anrufe genauso schnell sind wie bei herkömmlichen Telefonsystemen." },
                { question: "Was bedeutet 'Cloud-basiert' im Kontext von PBX?", answer: "'Cloud-basiert' bedeutet, dass die Telefonanlage nicht auf physischer Hardware vor Ort läuft, sondern in einem Rechenzentrum, das über das Internet zugänglich ist. Das ermöglicht Ihnen, Ihr Telefonsystem von überall aus zu verwalten und es einfach zu skalieren, wenn Ihr Unternehmen wächst." },
                { question: "Kann ich meine bestehende Telefonanlage behalten?", answer: "In den meisten Fällen können Sie Ihre bestehende Telefonanlage in eine CloudPBX-Lösung integrieren. Es gibt Optionen zur Portierung Ihrer bestehenden Nummern und zur Integration von Legacy-Systemen, sodass der Übergang nahtlos erfolgen kann." },
                { question: "Wie wirkt sich VoIP auf meine Internetverbindung aus?", answer: "VoIP benötigt Bandbreite, um gut zu funktionieren. Bei einer stabilen, schnellen Internetverbindung sollte die Nutzung von VoIP keinen merklichen Einfluss auf andere Online-Aktivitäten haben. Es ist wichtig, sicherzustellen, dass genügend Bandbreite zur Verfügung steht und QoS-Einstellungen (Quality of Service) korrekt konfiguriert sind, um die Sprachqualität zu gewährleisten." }
            ]
        },
        
        { 
            name: "Vorteile und Nutzen", 
            questions: [
                { question: "Welche Vorteile bietet CloudPBX gegenüber traditionellen Telefonanlagen?", answer: "Cloud PBX ist kostengünstiger, flexibel und einfach skalierbar. Es erfordert keine teure Hardware vor Ort, bietet Zugriff auf erweiterte Funktionen und ermöglicht es, von überall aus zu arbeiten." },
                { question: "Wie kann CloudPBX meinem Unternehmen helfen, Kosten zu sparen?", answer: "CloudPBX eliminiert die Notwendigkeit für teure, wartungsintensive Hardware und senkt die Kosten für internationale Anrufe. Zudem zahlen Sie nur für die genutzten Funktionen und können bei Bedarf einfach skalieren, ohne in zusätzliche Infrastruktur investieren zu müssen." },
                { question: "Welche Flexibilität bietet ein CloudPBX-System?", answer: "Ein CloudPBX-System ermöglicht es Ihnen, Anrufe und Funktionen von überall aus zu verwalten, sodass Ihre Mitarbeiter auch remote arbeiten können. Es lässt sich schnell an veränderte Geschäftsanforderungen anpassen, wie das Hinzufügen neuer Benutzer oder Funktionen." },
                { question: "Wie einfach ist es, ein CloudPBX-System zu erweitern?", answer: "CloudPBX ist sehr skalierbar. Sie können problemlos neue Benutzer, Telefonnummern und Funktionen hinzufügen, ohne komplexe Hardware-Installationen oder Ausfallzeiten. Die Verwaltung erfolgt einfach über eine Weboberfläche." },
                { question: "Welche Funktionen bietet CloudPBX zusätzlich zu herkömmlichen Telefonsystemen?", answer: "CloudPBX bietet eine Vielzahl von Funktionen, darunter Anrufweiterleitung, Voicemail, Konferenzschaltungen, Integration mit CRM-Systemen, automatische Anrufverteilung (ACD), interaktive Sprachauswahl (IVR) und vieles mehr." },
                { question: "Wie verbessert CloudPBX die Erreichbarkeit meines Teams?", answer: "CloudPBX ermöglicht es, Anrufe flexibel weiterzuleiten und bietet Funktionen wie Follow-Me und Voicemail-to-Email, sodass Ihr Team immer erreichbar ist, unabhängig davon, wo es sich befindet." },
                { question: "Ist CloudPBX für kleine und große Unternehmen geeignet?", answer: "Ja, CloudPBX ist für Unternehmen jeder Größe geeignet. Kleine Unternehmen profitieren von niedrigen Einstiegskosten und einfacher Bedienung, während große Unternehmen von der Skalierbarkeit und den erweiterten Funktionen profitieren." },
                { question: "Wie schnell kann mein Unternehmen auf CloudPBX umsteigen?", answer: "Der Umstieg auf CloudPBX ist in der Regel schnell und einfach, oft innerhalb weniger Tage möglich. Der Prozess umfasst die Serverinstallation (im Preis inbegriffen), die Konfiguration Ihrer Einstellungen (gegen eine zusätzliche Gebühr) und die Portierung Ihrer Nummern." },
                { question: "Welche Vorteile hat CloudPBX für remote arbeitende Teams?", answer: "CloudPBX unterstützt Remote-Arbeit hervorragend, da Mitarbeiter von überall aus auf das System zugreifen können. Funktionen wie mobile Apps, Webtelefonie und flexible Weiterleitungsregeln machen es einfach, auch außerhalb des Büros produktiv zu bleiben." },
                { question: "Wie kann CloudPBX zur Geschäftskontinuität beitragen?", answer: "CloudPBX bietet hohe Ausfallsicherheit und Redundanz, da es in sicheren, geografisch verteilten Rechenzentren betrieben wird. Bei einem lokalen Ausfall können Anrufe automatisch umgeleitet werden, sodass die Geschäftskommunikation nicht unterbrochen wird." }
            ]
        },

        { 
            name: "Kosten und Preisgestaltung", 
            questions: [
                { question: "Wie viel kostet ein CloudPBX-System?", answer: "Die Kosten für ein CloudPBX-System variieren je nach Anbieter und den gewählten Funktionen. Möchten Sie die Preise und Funktionen unserer CloudPBX-Systeme sehen?" },
                { question: "Gibt es versteckte Kosten bei CloudPBX?", answer: "Unsere Preise und Kosten sind transparent. Weitere Kosten, die wir erheben, werden vorab von uns kommuniziert. Zusätzliche Kosten können für internationale Anrufe oder spezielle Zusatzfunktionen anfallen." },
                { question: "Wie vergleicht sich CloudPBX kostenmäßig mit traditionellen Telefonanlagen?", answer: "CloudPBX ist oft günstiger, da keine teure Hardware angeschafft und gewartet werden muss. Außerdem entfallen viele der laufenden Kosten wie Wartung und Updates, die bei traditionellen Systemen anfallen." },
                { question: "Welche Faktoren beeinflussen die Kosten eines CloudPBX-Systems?", answer: "Die Kosten hängen von der Anzahl der Benutzer, den gewünschten Funktionen, dem Bedarf an internationalen Anrufen und eventuellen Zusatzdiensten wie CRM-Integration oder erweiterte Sicherheitsoptionen ab." },
                { question: "Was ist im monatlichen Preis für CloudPBX enthalten?", answer: "Unsere Preise sind standardmäßig auf eine jährliche Abrechnung ausgelegt. Wünschen Sie eine monatliche Abrechnung, so erheben wir 10% auf den Grundpreis ihrer gebuchten Option. Bitte nennen Sie Ihren Wunsch einer monatlichen Abrechnung in Ihrer Bestellung damit wir das berücksichtigen können." },
                { question: "Gibt es langfristige Verträge bei CloudPBX?", answer: "Die Verträge bei CloudPBX sind in der Regel unbefristet bzw. Sie buchen und bezahlen im Vorfeld für einen Zeitraum in der Wahl, mindestens jedoch für ein Jahr. Sollten Sie nach Ablauf des Zeitraums weiter Kunde bei uns bleiben wollen, so können wir Ihre Buchung erneut verlängern bei gleichbleibendem Preis." },
                { question: "Kann ich Funktionen nach Bedarf hinzubuchen?", answer: "Ja, CloudPBX ermöglicht es Ihnen, Funktionen je nach Bedarf hinzuzufügen oder zu entfernen. Dafür entscheiden Sie sich für ein Upgrade in eine höhere Lizenz oder ein Downgrade in eine niedrigere Lizenz. Das macht es einfach, die Kosten zu kontrollieren und das System an Ihre aktuellen Bedürfnisse anzupassen." },
                { question: "Wie kann ich die Kosten für internationale Anrufe minimieren?", answer: "CloudPBX bietet ggfs. spezielle Tarife für internationale Anrufe oder Flatrates für bestimmte Länder an. Durch den Wechsel zu einem solchen Tarif können die Kosten erheblich gesenkt werden. Sprechen Sie uns einfach an und wir prüfen die Möglichkeiten!" },
                { question: "Gibt es Rabatte für größere Unternehmen oder bei längeren Verträgen?", answer: "Wir bieten leider keine Rabatte an." },
                { question: "Wie unterscheiden sich die Kosten zwischen verschiedenen Anbietern?", answer: "Die Kosten können je nach Anbieter stark variieren, basierend auf den angebotenen Funktionen, dem Support und der Vertragsflexibilität. Mit CloudPBX haben Sie jedoch einen starken Partner für das beste Preis-Leistungs-Verhältnis." }
            ]
        },

        { 
            name: "Sicherheit und Zuverlässigkeit", 
            questions: [
                { question: "Wie sicher ist ein CloudPBX-System?", answer: "Cloud PBX-Systeme sind in der Regel sehr sicher, da sie auf modernste Verschlüsselungstechnologien und gesicherte Rechenzentren zurückgreifen. Wir setzen auf Maßnahmen wie Datenverschlüsselung, Firewalls und regelmäßige Sicherheitsupdates, um Ihre Kommunikation zu schützen." },
                { question: "Welche Sicherheitsfunktionen bieten CloudPBX-Systeme?", answer: "Typische Sicherheitsfunktionen umfassen Verschlüsselung von Sprachdaten, Zwei-Faktor-Authentifizierung, Zugriffskontrollen, DDoS-Schutz und regelmäßige Sicherheitsüberprüfungen. Diese Funktionen gewährleisten, dass Ihre Kommunikation vor unbefugtem Zugriff geschützt ist." },
                { question: "Wie wird meine Datenintegrität bei einem CloudPBX-System gewährleistet?", answer: "CloudPBX sorgt für die Datenintegrität durch redundante Systeme, regelmäßige Backups und sichere Datenübertragung. Ihre Daten werden in sicheren, georedundanten Rechenzentren gespeichert, um Ausfälle zu minimieren." },
                { question: "Was passiert bei einem Internetausfall?", answer: "Bei einem Internetausfall können Anrufe automatisch auf Mobiltelefone oder andere Backup-Leitungen umgeleitet werden. Die meisten CloudPBX-Systeme bieten Notfallpläne und Optionen zur Sicherstellung der Erreichbarkeit auch bei technischen Störungen." },
                { question: "Wie schützt CloudPBX vor Hackerangriffen?", answer: "CloudPBX-Systeme sind durch mehrere Sicherheitsebenen geschützt, darunter Firewalls, Intrusion-Detection-Systeme und regelmäßige Sicherheits-Patches. Wir überwachen unsere Systeme kontinuierlich auf verdächtige Aktivitäten und reagieren sofort auf potenzielle Bedrohungen." },
                { question: "Sind meine VoIP-Gespräche verschlüsselt?", answer: "Ja, CloudPBX verschlüsselt VoIP-Gespräche, um sicherzustellen, dass Ihre Gespräche vor Abhören geschützt sind. Dies erfolgt durch Technologien wie TLS (Transport Layer Security) und SRTP (Secure Real-Time Transport Protocol)." },
                { question: "Wie zuverlässig sind CloudPBX-Systeme?", answer: "CloudPBX-Systeme sind sehr zuverlässig, mit garantierten hohen Verfügbarkeiten (oft 99,9% oder höher). Wir nutzen georedundante Rechenzentren und Notfallpläne, um Ausfälle zu minimieren und kontinuierliche Betriebszeiten zu gewährleisten." },
                { question: "Wie werden meine Daten bei CloudPBX gespeichert und geschützt?", answer: "Ihre Daten werden in sicheren Rechenzentren gespeichert, die durch physische Sicherheitsmaßnahmen und digitale Schutzmechanismen gesichert sind. Regelmäßige Backups und Verschlüsselung sind Standard, um den Schutz Ihrer Daten zu gewährleisten." },
                { question: "Kann ich selbst Sicherheitsmaßnahmen für mein CloudPBX-System konfigurieren?", answer: "Ja, CloudPBX erlaubet Ihnen, zusätzliche Sicherheitsmaßnahmen wie Zugriffskontrollen, Benutzerrollen und spezifische Passwortregeln zu konfigurieren, um die Sicherheit Ihres Systems weiter zu erhöhen." },
                { question: "Wie wird die Vertraulichkeit meiner Anrufe und Daten gewährleistet?", answer: "Die Vertraulichkeit wird durch starke Verschlüsselungstechnologien und den Einsatz von Sicherheitsprotokollen wie TLS und SRTP gewährleistet. Wir setzen zudem auf strenge Datenschutzrichtlinien und regelmäßige Sicherheitsüberprüfungen." }
            ]
        },

        { 
            name: "Integration und Kompatibilität", 
            questions: [
                { question: "Kann CloudPBX mit meinen bestehenden Systemen integriert werden?", answer: "Ja, CloudPBX-Systeme sind in der Regel sehr kompatibel und können nahtlos in bestehende Systeme integriert werden, einschließlich CRM-Software, Helpdesk-Tools und anderer Business-Anwendungen. Dies ermöglicht eine einheitliche Kommunikationslösung." },
                { question: "Funktioniert CloudPBX mit meiner bestehenden Internetverbindung?", answer: "In den meisten Fällen funktioniert CloudPBX mit Ihrer bestehenden Internetverbindung. Es ist jedoch wichtig sicherzustellen, dass Ihre Bandbreite ausreicht, um die Sprachqualität zu gewährleisten. QoS-Einstellungen (Quality of Service) können dabei helfen, VoIP-Traffic zu priorisieren." },
                { question: "Kann ich meine bestehenden Telefonnummern behalten?", answer: "Ja, CloudPBX bietet die Möglichkeit, Ihre bestehenden Telefonnummern zu portieren, sodass Sie Ihre bekannten Rufnummern weiterhin verwenden können. Der Portierungsprozess ist in der Regel einfach und wird von uns unterstützt." },
                { question: "Ist CloudPBX mit verschiedenen Endgeräten kompatibel?", answer: "Ja, CloudPBX-Systeme sind mit einer Vielzahl von Endgeräten kompatibel, einschließlich VoIP-Telefonen, Softphones, Smartphones und Computern. Das macht es einfach, das System auf verschiedenen Plattformen zu nutzen." },
                { question: "Kann CloudPBX in mein CRM-System integriert werden?", answer: "Unsere CloudPBX-Systeme bieten Integrationen mit beliebten CRM-Systemen wie Salesforce, HubSpot oder Microsoft Dynamics. Diese Integration ermöglicht es, Anrufe direkt aus dem CRM zu tätigen, Anrufdaten zu speichern und Kundeninteraktionen zu verfolgen." },
                { question: "Wie funktioniert die Integration mit meiner E-Mail-Plattform?", answer: "CloudPBX kann oft in Ihre E-Mail-Plattform integriert werden, sodass Voicemails als E-Mail-Anhänge gesendet werden oder Anrufbenachrichtigungen direkt in Ihrem Posteingang landen. Das erleichtert das Management von Kommunikation an einem Ort." },
                { question: "Kann ich CloudPBX mit meinem bestehenden Telefonnetzwerk nutzen?", answer: "Ja, in vielen Fällen können bestehende Telefonnetze mit einem CloudPBX-System kombiniert werden, insbesondere wenn Ihr Unternehmen bereits VoIP-fähige Hardware verwendet. Adapter und Gateways können verwendet werden, um ältere Systeme zu verbinden." },
                { question: "Welche Software-Integrationen bietet CloudPBX?", answer: "CloudPBX-Systeme bieten oft eine Vielzahl von Integrationen mit Softwarelösungen, darunter Kalenderanwendungen, Collaboration-Tools wie Slack oder Microsoft Teams, und Projektmanagement-Tools. Diese Integrationen verbessern die Effizienz und Zusammenarbeit." },
                { question: "Ist CloudPBX mit mobilen Geräten kompatibel?", answer: "Ja, CloudPBX ist vollständig mit mobilen Geräten kompatibel. Sie können Anrufe über mobile Apps tätigen und empfangen, Voicemail abhören und Ihre Einstellungen direkt auf Ihrem Smartphone verwalten." },
                { question: "Wie flexibel ist die Integration von Drittanbieter-Software mit CloudPBX?", answer: "In den meisten Fällen ist die Integration von Drittanbieter-Software mit CloudPBX möglich. Dies hängt jedoch von der Drittanbieter-Software ab, die Sie integrieren möchten. Sprechen Sie uns an, wir prüfen die Möglichkeiten!" }
            ]
        },

        { 
            name: "Installation und Einrichtung", 
            questions: [
                { question: "Wie wird ein CloudPBX-System installiert?", answer: "Die Installation eines CloudPBX-Systems erfolgt online, ohne dass physische Hardware erforderlich ist. Sie melden sich an, konfigurieren Ihre Einstellungen über eine Weboberfläche und richten Benutzer und Funktionen ein." },
                { question: "Benötige ich spezielle Hardware für die Installation?", answer: "Für die Nutzung eines CloudPBX-Systems benötigen Sie keine spezielle Hardware. Einfache VoIP-Telefone oder sogar Software-basierte Telefone (Softphones) auf Computern oder Smartphones reichen aus, um das System zu nutzen." },
                { question: "Wie lange dauert die Einrichtung eines CloudPBX-Systems?", answer: "Die Einrichtung eines CloudPBX-Systems kann in der Regel innerhalb von wenigen Stunden bis Tagen abgeschlossen werden, je nach Komplexität und Anzahl der Benutzer. Die meisten Systeme sind schnell einsatzbereit und erfordern keine langen Vorlaufzeiten." },
                { question: "Muss ich meine bestehende Telefonanlage ersetzen?", answer: "In den meisten Fällen müssen Sie Ihre bestehende Telefonanlage nicht vollständig ersetzen. CloudPBX-Systeme können oft mit Ihrer aktuellen Infrastruktur kombiniert werden, oder Sie können Ihre bestehenden Nummern in das neue System portieren." },
                { question: "Gibt es einen Installationsprozess, den ich selbst durchführen kann?", answer: "Ja, Cloud PBX bietet benutzerfreundliche Installationsassistenten und Anleitungen, mit denen Sie die Einrichtung selbst durchführen können. Der Prozess ist so gestaltet, dass er einfach und intuitiv ist, selbst ohne technische Vorkenntnisse." },
                { question: "Wie erfolgt die Portierung meiner bestehenden Telefonnummern?", answer: "Die Portierung Ihrer bestehenden Telefonnummern erfolgt in der Regel durch CloudPBX. Wir übernehmen die Koordination mit Ihrem aktuellen Anbieter und stellen sicher, dass Ihre Nummern ohne Unterbrechung auf das neue System übertragen werden." },
                { question: "Welche Schritte sind erforderlich, um das System einzurichten?", answer: "Die Einrichtung umfasst die Registrierung bei CloudPBX, die Konfiguration Ihrer Benutzerkonten, das Einrichten von Anrufregeln und Funktionen sowie das Testen des Systems, um sicherzustellen, dass alles wie gewünscht funktioniert." },
                { question: "Brauche ich IT-Kenntnisse für die Installation?", answer: "In der Regel sind keine speziellen IT-Kenntnisse erforderlich, da CloudPBX-Systeme einfach über eine Weboberfläche konfiguriert werden können. Bei Bedarf stehen jedoch Unterstützung und Anleitungen bereit, um den Prozess zu erleichtern. Für eine zusätzliche Gebühr übernehmen wir auch gerne die Konfiguration Ihrer Systeme." },
                { question: "Wie wird die Integration mit bestehenden Systemen durchgeführt?", answer: "Die Integration mit bestehenden Systemen erfolgt oft über einfache Konfigurationen und Integrationsmodule, die von CloudPBX bereitgestellt werden. Dies kann CRM-Systeme, E-Mail-Plattformen oder andere geschäftskritische Anwendungen umfassen." },
                { question: "Kann ich Unterstützung während der Installation erhalten?", answer: "Ja, wir bieten umfassende Unterstützung während der Installation an, einschließlich technischer Hilfe und Installationsassistenten. Sie können Unterstützung per E-Mail oder nach Terminvereinbarung auch Remote erhalten, um sicherzustellen, dass die Installation reibungslos verläuft. In speziellen Fällen bieten wir auch einen Vor-Ort-Service an, der jedoch mit einer zusätzlichen Gebühr einhergeht." }
            ]
        },

        { 
            name: "Funktionen und Features", 
            questions: [
                { question: "Welche grundlegenden Funktionen bietet ein CloudPBX-System?", answer: "Ein CloudPBX-System bietet grundlegende Funktionen wie Anrufweiterleitung, Voicemail, Anrufprotokollierung, Konferenzschaltungen, automatische Anrufverteilung (ACD) und interaktive Sprachauswahl (IVR). Diese Funktionen helfen dabei, Anrufe effizient zu verwalten und die Kommunikation zu optimieren. Möchten Sie die Liste der Funktionen sehen?" },
                { question: "Welche erweiterten Funktionen sind verfügbar?", answer: "Erweiterte Funktionen können CRM-Integration, Anrufaufzeichnung, Echtzeit-Analysen, mobile Apps, virtuelle Faxdienste, Follow-Me-Routing und automatische Spracherkennung umfassen. Diese Funktionen bieten zusätzliche Flexibilität und Effizienz bei der Verwaltung von Anrufen und Kommunikationsprozessen. Möchten Sie die Liste der Funktionen sehen?" },
                { question: "Wie funktioniert die Anrufweiterleitung?", answer: "Anrufweiterleitung ermöglicht es, eingehende Anrufe automatisch an eine andere Telefonnummer oder ein anderes Gerät weiterzuleiten. Dies kann basierend auf vordefinierten Regeln wie Tageszeiten, Anrufvolumen oder Verfügbarkeit von Mitarbeitern konfiguriert werden." },
                { question: "Was ist IVR (Interactive Voice Response) und wie wird es genutzt?", answer: "IVR (Interactive Voice Response) ist ein System, das Anrufer über ein Menü aus Sprachbefehlen oder Tastenanschlägen durch verschiedene Optionen leitet. Es hilft dabei, Anrufe effizient zu routen und einfache Anfragen automatisch zu bearbeiten, ohne menschliches Eingreifen." },
                { question: "Kann ich Anrufe aufzeichnen?", answer: "Ja, CloudPBX-Systeme bieten die Möglichkeit, Anrufe aufzuzeichnen. Dies kann automatisch für alle Anrufe oder selektiv für bestimmte Anrufe geschehen. Die Aufzeichnungen sind nützlich für Schulungszwecke, Qualitätssicherung und rechtliche Anforderungen." },
                { question: "Wie funktioniert die Integration mit CRM-Systemen?", answer: "Die Integration mit CRM-Systemen ermöglicht es, Anrufe direkt aus dem CRM zu tätigen, Anrufdaten zu speichern und Kundeninteraktionen zu verfolgen. Diese Integration verbessert die Effizienz und die Kundenzufriedenheit, indem sie eine einheitliche Datenquelle bietet." },
                { question: "Welche Funktionen bieten die mobilen Apps?", answer: "Mobile Apps für CloudPBX-Systeme bieten Funktionen wie Anruf tätigen und empfangen, Voicemail abrufen, Anrufprotokolle einsehen und Zugriff auf Unternehmensfunktionen von unterwegs. Dies sorgt für eine nahtlose Kommunikation, egal wo sich die Mitarbeiter befinden." },
                { question: "Wie funktioniert die Anrufprotokollierung?", answer: "Anrufprotokollierung erfasst Details zu jedem Anruf, einschließlich Anrufdauer, Teilnehmer und Uhrzeit. Diese Protokolle sind hilfreich für die Überwachung der Anrufaktivitäten, Erstellung von Berichten und Verbesserung des Kundenservices." },
                { question: "Kann ich spezielle Anrufregeln erstellen?", answer: "Ja, Sie können spezielle Anrufregeln erstellen, um Anrufe basierend auf verschiedenen Kriterien zu verwalten. Dazu gehören Regeln für die Weiterleitung, Sperrung, Umleitung oder Priorisierung von Anrufen, um sicherzustellen, dass alle Anforderungen Ihrer Geschäftsprozesse erfüllt werden." },
                { question: "Welche Optionen gibt es für die Konferenzschaltung?", answer: "CloudPBX bietet Optionen für Telefon- und Webkonferenzen, einschließlich der Möglichkeit, mehrere Teilnehmer gleichzeitig zu verbinden. Funktionen wie Bildschirmfreigabe, Chat und Teilnehmerverwaltung sind ebenfalls verfügbar." }
            ]
        },

        { 
            name: "Support und Service", 
            questions: [
                { question: "Welche Art von Support wird für CloudPBX-Systeme angeboten?", answer: "CloudPBX bietet umfassenden Support, einschließlich technischer Unterstützung per E-Mail und Remote. Wir bieten auch umfangreiche Blogartikel, Hilfestellungen und FAQ-Seiten zur Selbsthilfe an." },
                { question: "Gibt es einen 24/7-Support?", answer: "Leider nicht, CloudPBX bietet derzeit zwar einen schnellen Support an, um sicherzustellen, dass alle Probleme schnell gelöst werden können, aber nicht im Umfang von 24 Stunden am Tag und 7 Tage die Woche. Ein 24/7-Support ist allerdings geplant und wird in Zukunft verfügbar sein." },
                { question: "Wie schnell kann ich mit einer Antwort vom Support rechnen?", answer: "Die Reaktionszeit des Supports kann je nach Anfrage variieren, aber wir bieten schnelle Antworten auf Anfragen, oft innerhalb von wenigen Stunden oder sogar Minuten. Bei dringenden Problemen gibt es oft einen priorisierten Supportkanal." },
                { question: "Welche Arten von Schulungen werden angeboten?", answer: "Derzeit bietet CloudPBX keine Schulungen an. Allerdings profitieren Sie von Handbüchern und Anleitungen sowie unserer Webseite und unserem Support, um sich optimal auf Ihr CloudPBX-System vorzubereiten." },
                { question: "Wie erfolgt die Unterstützung bei der Fehlersuche?", answer: "Unterstützung bei der Fehlersuche erfolgt meistens über Fernzugriff auf Ihr System, detaillierte Anleitungen zur Problemlösung und direkte technische Unterstützung durch Supportmitarbeiter. Bei komplexen Problemen stehen wir Ihnen auch mit unserem Vor-Ort-Service - gegen eine Servicegebühr - zur Verfügung." },
                { question: "Gibt es eine Wissensdatenbank oder FAQs?", answer: "Ja, auf unserer Webseite bieten wir umfangreiche Wissensdatenbanken und FAQ-Seiten, die Antworten auf häufige Fragen, Schritt-für-Schritt-Anleitungen und Problemlösungsstrategien enthalten. Diese Ressourcen sind rund um die Uhr verfügbar und kostenlos." },
                { question: "Wie funktioniert der Support bei Software-Updates?", answer: "CloudPBX kümmert sich in der Regel um die Durchführung und Implementierung von Software-Updates automatisch, sodass Sie stets die neuesten Funktionen und Sicherheitsupdates erhalten. Bei größeren Updates gibt es oft Ankündigungen und Unterstützung, um einen reibungslosen Übergang zu gewährleisten." },
                { question: "Welche Unterstützung ist verfügbar, wenn ich mein System anpassen möchte?", answer: "Bei Anpassungen oder Erweiterungen des Systems bieten wir Unterstützung durch technische Berater oder spezialisierten Support. Dies kann Hilfe bei der Konfiguration, Anpassung von Funktionen oder Integration neuer Komponenten umfassen." },
                { question: "Gibt es eine Community oder ein Forum für den Austausch mit anderen Nutzern?", answer: "Derzeit haben wir keine Community-Foren oder Online-Communities, in denen Sie sich mit anderen Nutzern austauschen, Fragen stellen und Erfahrungen teilen können. Dies ist jedoch geplant und könnte zukünftig verfügbar sein." },
                { question: "Wie erfolgt der Support bei der Integration mit anderen Systemen?", answer: "Der Support bei der Integration mit anderen Systemen erfolgt in der Regel durch spezialisierte Integrationsberater oder technische Supportmitarbeiter, die Ihnen bei der Verbindung Ihres CloudPBX-Systems mit CRM-Systemen, E-Mail-Plattformen und anderen Anwendungen helfen." }
            ]
        },

        { 
            name: "Skalierbarkeit und Flexibilität", 
            questions: [
                { question: "Wie skalierbar ist ein CloudPBX-System?", answer: "CloudPBX-Systeme sind äußerst skalierbar und können leicht an die Größe Ihres Unternehmens angepasst werden. Sie können problemlos Benutzer hinzufügen oder entfernen und zusätzliche Funktionen oder Ressourcen je nach Bedarf durch ein Upgrade Ihrer Lizenz erhalten." },
                { question: "Kann ich die Anzahl der Benutzer flexibel anpassen?", answer: "Ja, die Anzahl der Benutzer kann flexibel angepasst werden. Sie können neue Benutzer hinzufügen oder bestehende entfernen, um sicherzustellen, dass Ihr System immer den aktuellen Anforderungen Ihres Unternehmens entspricht." },
                { question: "Wie einfach ist es, zusätzliche Funktionen zu integrieren?", answer: "Das Hinzufügen zusätzlicher Funktionen ist einfach und erfolgt über ein Upgrade Ihrer CloudPBX-Lizenz. Sie können neue Funktionen wie Call-Center-Tools, CRM-Integrationen oder erweiterte Anrufanalysen nach Bedarf buchen." },
                { question: "Kann ich das System für verschiedene Standorte anpassen?", answer: "Ja, CloudPBX-Systeme können problemlos mehrere Standorte integrieren. Sie können Anrufe zwischen verschiedenen Büros weiterleiten, eine zentrale Verwaltung für alle Standorte einrichten und die Kommunikation standortübergreifend optimieren." },
                { question: "Wie flexibel ist das System bei saisonalen oder kurzfristigen Änderungen?", answer: "Das System ist sehr flexibel bei saisonalen oder kurzfristigen Änderungen. Sie können zusätzliche Leitungen, Benutzer oder Funktionen für einen bestimmten Zeitraum hinzufügen oder reduzieren, ohne langfristige Verpflichtungen eingehen zu müssen." },
                { question: "Wie funktioniert die Anpassung bei internationaler Expansion?", answer: "Bei internationaler Expansion können Sie einfach neue Länder und Regionen hinzufügen. Das System ermöglicht die Konfiguration internationaler Nummern, lokale Anrufpläne und die Integration von Nutzern weltweit." },
                { question: "Kann ich benutzerdefinierte Funktionen oder Erweiterungen integrieren?", answer: "Ja, CloudPBX-Systeme bieten die Möglichkeit, benutzerdefinierte Funktionen oder Erweiterungen zu integrieren. Dies kann durch APIs, Integrationen oder durch den Anbieter bereitgestellte Module erfolgen, um spezifische Anforderungen zu erfüllen." },
                { question: "Wie schnell kann das System bei wachsendem Anrufvolumen angepasst werden?", answer: "Das System kann schnell und unkompliziert an wachsendes Anrufvolumen angepasst werden. Sie können zusätzliche Kapazitäten aktivieren, ohne dass umfangreiche Hardware-Upgrades erforderlich sind, und die Skalierung erfolgt oft automatisch." },
                { question: "Wie flexibel ist das Vertragsmodell?", answer: "Das Vertragsmodell für CloudPBX-Systeme ist in der Regel flexibel. Wir bieten jährliche Verträge an, und es gibt oft Optionen, um Verträge anzupassen oder zu ändern, um den sich verändernden Bedürfnissen Ihres Unternehmens gerecht zu werden. Verträge werden immer auf ein Jahr Laufzeit geschlossen und sind mit einer Kündigungsfrist von 2 Monaten ausgestattet. Bei Bedarf können wir Verträge immer weiter verlängern." },
                { question: "Kann ich spezielle Funktionen für unterschiedliche Abteilungen oder Teams einrichten?", answer: "Ja, Sie können spezielle Funktionen und Einstellungen für verschiedene Abteilungen oder Teams einrichten. Dies ermöglicht maßgeschneiderte Anrufweiterleitungen, unterschiedliche IVR-Menüs und spezifische Funktionen für jede Abteilung oder Benutzergruppe." }
            ]
        },

        { 
            name: "Technische Anforderungen", 
            questions: [
                { question: "Welche technischen Voraussetzungen sind für die Nutzung eines CloudPBX-Systems erforderlich?", answer: "Für die Nutzung eines CloudPBX-Systems benötigen Sie eine stabile Internetverbindung, einen modernen Webbrowser und, je nach System, VoIP-fähige Telefone oder Software-Telefone (Softphones). Keine zusätzliche Hardware ist erforderlich, wenn Sie bereits über Internetzugang und geeignete Endgeräte verfügen." },
                { question: "Brauche ich spezielle Router oder Netzwerkgeräte?", answer: "In den meisten Fällen benötigen Sie keine speziellen Router oder Netzwerkgeräte. Es ist jedoch wichtig, dass Ihr Netzwerk ausreichend Bandbreite und eine stabile Verbindung bietet, um die Sprachqualität zu gewährleisten. Für bessere Leistung kann ein Quality of Service (QoS)-fähiger Router empfohlen werden." },
                { question: "Welche Internetgeschwindigkeit wird empfohlen?", answer: "Eine empfohlene Internetgeschwindigkeit für eine qualitativ hochwertige VoIP-Kommunikation liegt bei mindestens 100 kbps pro gleichzeitigem Sprachkanal. Für größere Benutzerzahlen oder zusätzliche Funktionen sollte die Geschwindigkeit entsprechend erhöht werden, um eine gute Sprachqualität und Verbindungsstabilität zu gewährleisten." },
                { question: "Welche Endgeräte kann ich verwenden?", answer: "Sie können eine Vielzahl von Endgeräten verwenden, einschließlich VoIP-Telefone, Softphones (Software-basierte Telefone auf Computern oder Smartphones) und traditionelle Telefone mit einem Adapter. Die Wahl des Endgeräts hängt von Ihren persönlichen Vorlieben und Anforderungen ab." },
                { question: "Sind spezielle Einstellungen für die Firewall erforderlich?", answer: "Ja, in einigen Fällen müssen Sie Ihre Firewall-Einstellungen anpassen, um sicherzustellen, dass die erforderlichen Ports für VoIP-Verbindungen offen sind. CloudPBX kann Ihnen eine Liste der benötigten Ports und Anleitungen zur Verfügung stellen." },
                { question: "Wie wird die Sprachqualität sichergestellt?", answer: "Die Sprachqualität wird durch eine stabile und schnelle Internetverbindung, ausreichende Bandbreite und, falls möglich, durch QoS-Einstellungen in Ihrem Netzwerk sichergestellt. CloudPBX implementiert auch Technologien zur Rauschunterdrückung und Echo-Kompensation, um die Gesprächsqualität zu verbessern." },
                { question: "Welche Sicherheitsmaßnahmen sind erforderlich?", answer: "Sicherheitsmaßnahmen umfassen die Nutzung von Verschlüsselung für Sprachübertragungen (wie TLS/SRTP), starke Passwörter und regelmäßige Updates. Zusätzlich sollten Sie sicherstellen, dass Ihre Netzwerkgeräte und Endgeräte sicher konfiguriert sind und Zugriffsberechtigungen angemessen eingestellt sind." },
                { question: "Wie erfolgt die Integration mit bestehenden Systemen?", answer: "Die Integration erfolgt häufig über standardisierte Schnittstellen (APIs) oder spezielle Integrationsmodule, die von CloudPBX bereitgestellt werden. Diese ermöglicht es, das PBX-System mit CRM-Systemen, E-Mail-Plattformen und anderen Geschäftsanwendungen zu verbinden." },
                { question: "Welche Anforderungen gibt es für mobile Geräte?", answer: "Mobile Geräte benötigen eine stabile Internetverbindung und eine kompatible App oder Softphone-Software. CloudPBX bieten mobile Apps an, die auf iOS- und Android-Geräten installiert werden können und die gleichen Funktionen wie Desktop-Systeme bieten." },
                { question: "Wie werden Software-Updates durchgeführt?", answer: "Software-Updates für CloudPBX-Systeme werden in der Regel automatisch von uns durchgeführt, ohne dass Sie eingreifen müssen. Sie erhalten oft Benachrichtigungen über neue Funktionen oder wichtige Sicherheitsupdates, während die Aktualisierung im Hintergrund erfolgt." }
            ]
        },

        { 
            name: "Vergleich mit traditionellen Systemen", 
            questions: [
                { question: "Wie unterscheidet sich ein CloudPBX-System von einem traditionellen PBX-System?", answer: "Ein CloudPBX-System wird über das Internet bereitgestellt und erfordert keine lokale Hardware, während ein traditionelles PBX-System Hardware und eine physische Telefonanlage vor Ort benötigt. CloudPBX bietet mehr Flexibilität, Skalierbarkeit und geringere Anfangskosten im Vergleich zu traditionellen Systemen." },
                { question: "Was sind die Vorteile eines CloudPBX-Systems gegenüber einer klassischen Telefonanlage?", answer: "Die Vorteile eines CloudPBX-Systems umfassen geringere Anfangsinvestitionen, einfache Skalierbarkeit, automatische Updates, ortsunabhängige Nutzung und Integration mit modernen Kommunikationsmitteln. Außerdem entfallen Wartungskosten und der Bedarf an physischer Hardware." },
                { question: "Wie sieht es mit den Kosten im Vergleich zu traditionellen Telefonanlagen aus?", answer: "CloudPBX-Systeme haben in der Regel niedrigere Anfangskosten, da keine teure Hardware benötigt wird. Stattdessen zahlen Sie eine jährliche Gebühr pro Benutzer oder Funktion. Bei traditionellen Telefonanlagen fallen höhere Anschaffungs- und Wartungskosten an, sowie die Kosten für Hardware und Installation." },
                { question: "Wie ist die Skalierbarkeit im Vergleich zu traditionellen PBX-Systemen?", answer: "CloudPBX-Systeme bieten eine höhere Flexibilität bei der Skalierung. Sie können schnell Benutzer hinzufügen oder entfernen, ohne neue Hardware kaufen oder installieren zu müssen. Traditionelle PBX-Systeme erfordern oft kostspielige Hardware-Upgrades und umfassende Installationen bei Änderungen in der Größe." },
                { question: "Wie unterscheiden sich die Wartung und der Support bei CloudPBX und traditionellen Systemen?", answer: "CloudPBX bietet automatisierte Updates und fortlaufenden Support, was die Wartung erleichtert. Traditionelle Systeme erfordern regelmäßige manuelle Wartung, Updates durch Techniker und möglicherweise teure Reparaturen." },
                { question: "Wie werden Sicherheitsaspekte bei CloudPBX im Vergleich zu traditionellen Systemen behandelt?", answer: "CloudPBX implementiert fortschrittliche Sicherheitsmaßnahmen wie Datenverschlüsselung und regelmäßige Sicherheitsupdates. Traditionelle Systeme können ebenfalls sicher sein, erfordern jedoch manuelle Sicherheitsmaßnahmen und physische Schutzvorkehrungen, um Daten zu schützen." },
                { question: "Wie flexibel ist die Integration von CloudPBX-Systemen im Vergleich zu traditionellen Systemen?", answer: "CloudPBX-Systeme bieten umfassende Integrationsmöglichkeiten mit modernen Softwarelösungen wie CRM-Systemen und mobilen Apps. Traditionelle Systeme können integrationsfreundlich sein, aber häufig erfordern sie zusätzliche Hardware und spezielle Anpassungen." },
                { question: "Wie sieht die Benutzerfreundlichkeit bei CloudPBX im Vergleich zu traditionellen Telefonanlagen aus?", answer: "CloudPBX-Systeme sind benutzerfreundlicher, da sie über intuitive Weboberflächen und mobile Apps gesteuert werden können. Traditionelle Systeme können komplexer zu verwalten sein und erfordern oft technisches Wissen für Konfiguration und Anpassung." },
                { question: "Wie verhält sich die Zuverlässigkeit von CloudPBX-Systemen im Vergleich zu traditionellen Telefonanlagen?", answer: "CloudPBX-Systeme bieten hohe Zuverlässigkeit durch redundante Server und Netzwerkarchitekturen, die Ausfälle minimieren. Traditionelle Systeme sind ebenfalls zuverlässig, jedoch abhängig von der lokalen Hardware, die bei Ausfällen oder Störungen repariert oder ersetzt werden muss." },
                { question: "Wie ist die Anpassungsfähigkeit der Funktionen bei CloudPBX im Vergleich zu traditionellen Systemen?", answer: "CloudPBX-Systeme bieten eine hohe Anpassungsfähigkeit mit der Möglichkeit, Funktionen einfach zu aktivieren oder zu deaktivieren und neue Features schnell hinzuzufügen. Traditionelle Systeme sind oft weniger flexibel und erfordern umfangreiche Konfigurationen oder Hardware-Upgrades für Anpassungen." }
            ]
        },

        { 
            name: "Benutzererfahrungen und Fallstudien", 
            questions: [
                { question: "Wie bewerten andere Unternehmen die Nutzung von CloudPBX-Systemen?", answer: "Viele Unternehmen berichten von positiven Erfahrungen mit CloudPBX-Systemen, einschließlich verbesserter Flexibilität, Kosteneinsparungen und einfacher Verwaltung. Benutzer loben oft die einfache Skalierbarkeit und die nahtlose Integration mit anderen Geschäftsanwendungen." },
                { question: "Gibt es bekannte Fallstudien, die den Erfolg eines CloudPBX-Systems zeigen?", answer: "Ja, es gibt zahlreiche Fallstudien, die den Erfolg von CloudPBX-Systemen dokumentieren. Beispiele zeigen, wie Unternehmen durch die Implementierung von CloudPBX ihre Kommunikation verbessert, Kosten gesenkt und die Effizienz gesteigert haben. Diese Fallstudien sind oft auf den Websites der Anbieter oder in Branchenberichten zu finden." },
                { question: "Wie haben kleine und mittelständische Unternehmen von CloudPBX-Systemen profitiert?", answer: "Kleine und mittelständische Unternehmen profitieren oft von CloudPBX-Systemen durch niedrigere Kosten, einfache Skalierung und flexible Anpassung. Sie können moderne Funktionen nutzen, ohne in teure Hardware investieren zu müssen, und profitieren von einer schnellen Implementierung." },
                { question: "Welche Herausforderungen haben Unternehmen bei der Implementierung von CloudPBX-Systemen erlebt?", answer: "Einige Unternehmen haben bei der Implementierung von CloudPBX-Systemen Herausforderungen wie die Integration mit bestehenden Systemen, Schulungsbedarf und Anpassung der Netzwerkinfrastruktur erlebt. Wir bieten jedoch Unterstützung, um diese Herausforderungen zu bewältigen und eine reibungslose Umstellung zu gewährleisten." },
                { question: "Gibt es spezifische Branchen, die besonders von CloudPBX-Systemen profitieren?", answer: "Ja, Branchen wie Call-Center, Gesundheitswesen, Einzelhandel und Finanzdienstleistungen profitieren besonders von CloudPBX-Systemen aufgrund der hohen Anrufvolumen, der Notwendigkeit zur Skalierung und der Integration mit anderen Geschäftsanwendungen. CloudPBX bietet diesen Branchen flexible, skalierbare und kosteneffiziente Lösungen." },
                { question: "Wie haben Unternehmen ihre Kommunikation durch den Einsatz von CloudPBX verbessert?", answer: "Unternehmen haben ihre Kommunikation durch CloudPBX verbessert, indem sie Funktionen wie Anrufweiterleitung, automatische Anrufverteilung und IVR eingesetzt haben, um Anfragen effizienter zu bearbeiten. Auch die Integration mit CRM-Systemen hat die Kundeninteraktion und den Service verbessert." },
                { question: "Welche Rückmeldungen geben Benutzer zur Benutzerfreundlichkeit von CloudPBX-Systemen?", answer: "Benutzer berichten in der Regel von einer hohen Benutzerfreundlichkeit von CloudPBX-Systemen. Die intuitiven Weboberflächen, mobilen Apps und einfachen Konfigurationsmöglichkeiten erleichtern die Nutzung und Verwaltung, selbst für Personen ohne technische Vorkenntnisse." },
                { question: "Gibt es Beispiele für Unternehmen, die durch CloudPBX erhebliche Kosteneinsparungen erzielt haben?", answer: "Ja, zahlreiche Unternehmen haben durch den Einsatz von CloudPBX erhebliche Kosteneinsparungen erzielt, insbesondere durch reduzierte Investitions- und Wartungskosten für Hardware, niedrigere monatliche Gebühren im Vergleich zu traditionellen Systemen und geringere Betriebskosten durch vereinfachte Verwaltung." },
                { question: "Wie haben Unternehmen die Unterstützung und den Service bei der Nutzung von CloudPBX-Systemen bewertet?", answer: "Viele Unternehmen bewerten den Support und Service bei CloudPBX-Systemen positiv. Sie schätzen den schnellen Zugang zu technischer Unterstützung, umfassende Informationsangebote und proaktive Wartung, die sicherstellt, dass das System stets reibungslos funktioniert." },
                { question: "Wie haben Unternehmen ihre Arbeitsabläufe durch CloudPBX-Systeme optimiert?", answer: "Unternehmen haben ihre Arbeitsabläufe durch CloudPBX-Systeme optimiert, indem sie Funktionen wie Anrufprotokollierung, Echtzeit-Analysen und CRM-Integration genutzt haben, um die Effizienz zu steigern und fundierte Entscheidungen zu treffen. Die flexible Anpassung und schnelle Reaktion auf Änderungen haben ebenfalls zur Verbesserung der Arbeitsabläufe beigetragen." }
            ]
        },

        { 
            name: "Häufig gestellte Fragen (FAQ)", 
            questions: [
                { question: "Was ist ein CloudPBX-System?", answer: "Ein CloudPBX-System ist eine moderne Telefonanlage, die über das Internet bereitgestellt wird. Es ermöglicht die Verwaltung von Telefonanrufen, Voicemail und anderen Kommunikationsdiensten ohne die Notwendigkeit physischer Hardware vor Ort." },
                { question: "Wie funktioniert ein CloudPBX-System?", answer: "Ein CloudPBX-System funktioniert, indem es Sprachdaten über das Internet überträgt. Anrufe werden durch die Cloud-Infrastruktur des Anbieters geleitet, die Anrufweiterleitung, Voicemail und andere Funktionen bereitstellt. Sie benötigen lediglich Internetzugang und kompatible Endgeräte." },
                { question: "Welche Vorteile bietet ein CloudPBX-System im Vergleich zu einem traditionellen Telefonanlagen-System?", answer: "Vorteile eines CloudPBX-Systems umfassen geringere Anfangskosten, einfache Skalierbarkeit, automatische Updates, keine Notwendigkeit für physische Hardware und die Möglichkeit, Funktionen flexibel anzupassen und zu integrieren." },
                { question: "Wie sicher ist ein CloudPBX-System?", answer: "CloudPBX-Systeme bieten hohe Sicherheitsstandards, darunter Datenverschlüsselung, regelmäßige Sicherheitsupdates und Zugriffsberechtigungen. Anbieter implementieren auch Maßnahmen wie Firewalls und Sicherheitsprotokolle, um Ihre Kommunikation zu schützen." },
                { question: "Kann ich mein bestehendes Telefonsystem auf ein CloudPBX-System umstellen?", answer: "Ja, CloudPBX unterstützt die Migration von bestehenden Telefonsystemen. Der Umstellungsprozess wird normalerweise vom Anbieter unterstützt, um sicherzustellen, dass die Übergabe reibungslos erfolgt und alle Funktionen nahtlos integriert werden." },
                { question: "Wie lange dauert die Einrichtung eines CloudPBX-Systems?", answer: "Die Einrichtung eines CloudPBX-Systems kann in der Regel innerhalb weniger Stunden bis zu einigen Tagen erfolgen, abhängig von der Komplexität der Installation und der Anzahl der Benutzer. Wir bieten meistens eine schnelle und unkomplizierte Implementierung." },
                { question: "Welche Kosten sind mit einem CloudPBX-System verbunden?", answer: "Die Kosten für ein CloudPBX-System bestehen in der Regel aus einer jährlichen Gebühr pro Benutzer oder Funktion. Es können auch zusätzliche Kosten für bestimmte Funktionen oder Integrationen anfallen. Im Vergleich zu traditionellen Systemen fallen jedoch keine hohen Anfangsinvestitionen für Hardware an." },
                { question: "Wie kann ich meine CloudPBX-Anlage skalieren?", answer: "Sie können Ihre CloudPBX-Anlage einfach skalieren, indem Sie neue Benutzer hinzufügen oder bestehende reduzieren. Dies erfolgt in der Regel über das Verwaltungsportal von CloudPBX, und Änderungen werden sofort umgesetzt, ohne dass Hardware-Änderungen erforderlich sind." },
                { question: "Welche Endgeräte kann ich mit einem CloudPBX-System verwenden?", answer: "Sie können VoIP-Telefone, Softphones (Software-Telefone auf Computern oder Smartphones) und traditionelle Telefone (mit einem Adapter) verwenden. CloudPBX-Systeme sind flexibel und unterstützen eine Vielzahl von Endgeräten." },
                { question: "Wie funktioniert der Support bei einem CloudPBX-System?", answer: "Der Support für CloudPBX-Systeme erfolgt meist über E-Mail und Remote. CloudPBX bietet auch Wissensdatenbanken, FAQs und Blogbeiträge zur Selbsthilfe an. Der Support ist in der Regel schnell verfügbar, um schnelle Hilfe zu gewährleisten." },
                { question: "Kann ich meine Voicemail-Nachrichten von überall abrufen?", answer: "Ja, Voicemail-Nachrichten können in der Regel von überall über das Web-Portal oder eine mobile App von CloudPBX abgerufen werden. So haben Sie auch unterwegs Zugriff auf Ihre Nachrichten." },
                { question: "Was passiert, wenn meine Internetverbindung ausfällt?", answer: "Bei einem Ausfall der Internetverbindung können Anrufe möglicherweise nicht empfangen oder getätigt werden. Wir haben jedoch Notfallpläne oder Backup-Lösungen, um den Dienst aufrechtzuerhalten oder alternative Kommunikationsmethoden anzubieten." },
                { question: "Wie kann ich sicherstellen, dass mein CloudPBX-System immer aktuell ist?", answer: "CloudPBX führt regelmäßige Updates und Wartungsarbeiten durch, um sicherzustellen, dass Ihr System immer auf dem neuesten Stand ist. Diese Updates erfolgen automatisch, sodass Sie keine zusätzlichen Schritte unternehmen müssen." },
                { question: "Welche Funktionen sind in einem typischen CloudPBX-Paket enthalten?", answer: "Ein typisches CloudPBX-Paket enthält Funktionen wie Anrufweiterleitung, Voicemail, Anrufprotokollierung, automatische Anrufverteilung (ACD), interaktive Sprachauswahl (IVR) und oft auch mobile Apps und Integration mit CRM-Systemen." },
                { question: "Wie kann ich mein CloudPBX-System an die Bedürfnisse meines Unternehmens anpassen?", answer: "Sie können Ihr CloudPBX-System anpassen, indem Sie Funktionen aktivieren oder deaktivieren, benutzerdefinierte Regeln für Anrufweiterleitung festlegen und Integrationen mit anderen Anwendungen konfigurieren. Auch ein Upgrade oder Downgrade Ihrer Lizenz ist möglich, um Ihren Bedürfnissen gerecht zu werden." }
            ]
        },

        { 
            name: "Kontaktaufnahme und Beratung", 
            questions: [
                { question: "Wie kann ich mehr über Ihr CloudPBX-System erfahren?", answer: "Sie können mehr über unser CloudPBX-System erfahren, indem Sie unsere Website besuchen, unsere Produktbroschüren herunterladen oder direkt mit unserem Vertriebsteam in Kontakt treten. Wir bieten auch detaillierte Informationsmaterialien und Remoteberatungen an." },
                { question: "Wie kann ich eine Demo oder eine Testversion Ihres Systems anfordern?", answer: "Um eine Demo oder Testversion unseres Systems anzufordern, können Sie unser 3CX SMB Free Paket buchen. Wir empfehlen die Verwendung des 3CX SMB Free-Pakets allerdings nicht für einen professionellen und dauerhaften Einsatz, da das Paket nur über eingeschränkte Funktionen verfügt." },
                { question: "Wer kann mir eine individuelle Beratung anbieten?", answer: "Unsere Vertriebsmitarbeiter und Berater stehen Ihnen für eine individuelle Beratung zur Verfügung. Sie können uns per E-Mail erreichen, um einen Beratungstermin zu vereinbaren. Wir bieten maßgeschneiderte Lösungen, die auf die spezifischen Bedürfnisse Ihres Unternehmens zugeschnitten sind." },
                { question: "Wie kann ich einen Termin für eine persönliche Beratung vereinbaren?", answer: "Sie können einen Termin für eine persönliche Beratung über E-Mail vereinbaren. Geben Sie bitte Ihre bevorzugten Zeiten und Kontaktdaten an, damit wir einen passenden Termin finden können. Beratungen finden ausschließlich online statt." },
                { question: "Wo befindet sich Ihr Büro, wenn ich persönlich vorbeikommen möchte?", answer: "CloudPBX ist ein reines Online-Angebot. Wenn Sie mit uns persönlich in Kontakt treten möchten, bitten wir um vorherige Terminvereinbarung, um sicherzustellen, dass ein Berater verfügbar ist, um Ihre Fragen zu beantworten und Ihre Bedürfnisse zu besprechen. Beratungen finden ausschließlich online statt." },
                { question: "Welche Informationen benötige ich, um ein Angebot zu erhalten?", answer: "Um ein maßgeschneidertes Angebot zu erhalten, benötigen wir grundlegende Informationen über Ihre Unternehmensgröße, die Anzahl der Benutzer, die gewünschten Funktionen und Ihre speziellen Anforderungen. Diese Informationen können Sie uns per E-Mail oder über unser Kontaktformular zur Verfügung stellen." },
                { question: "Wie schnell kann ich mit einer Antwort auf meine Anfrage rechnen?", answer: "Auf Ihre Anfrage können Sie in der Regel innerhalb weniger Stunden bis 24 Stunden mit einer Antwort rechnen. Unser Team bemüht sich, schnell und effizient auf alle Anfragen zu reagieren und Ihnen alle benötigten Informationen zur Verfügung zu stellen." },
                { question: "Bieten Sie Unterstützung bei der Auswahl des richtigen Plans für mein Unternehmen an?", answer: "Ja, wir bieten umfassende Unterstützung bei der Auswahl des richtigen Plans für Ihr Unternehmen an. Unsere Berater helfen Ihnen, Ihre Bedürfnisse zu bewerten und den besten Plan auszuwählen, der zu Ihrem Budget und Ihren Anforderungen passt." },
                { question: "Gibt es Möglichkeiten für einen Live-Chat zur sofortigen Unterstützung?", answer: "Wir bieten derzeit keinen Live-Chat-Service auf unserer Website an, der Ihnen sofortige Unterstützung bietet. Unser Team steht Ihnen allerdings per E-Mail zur Verfügung, um Ihre Fragen zu beantworten und Ihnen bei der Lösung von Problemen zu helfen." },
                { question: "Wie kann ich Feedback oder Anregungen zu Ihrem Service geben?", answer: "Sie können Feedback oder Anregungen zu unserem Service über unser Kontaktformular oder per E-Mail einreichen. Wir schätzen Ihre Rückmeldungen und nutzen sie, um unseren Service kontinuierlich zu verbessern." }
            ]
        },

        { 
            name: "Bestellungsprozess", 
            questions: [
                { question: "Wie kann ich ein CloudPBX-System bestellen?", answer: "Sie können ein CloudPBX-System per E-Mail oder über unser Kontaktformular bestellen. Bitte senden Sie Ihre Anfrage an unsere E-Mail-Adresse oder nutzen Sie das Kontaktformular auf unserer Website." },
                { question: "Welche Informationen benötige ich, um eine Bestellung aufzugeben?", answer: "Für eine Bestellung benötigen wir vollständige Kundendaten, einschließlich Ihrer Adresse, Unternehmensname und Rechnungs-E-Mail-Adresse. Diese Informationen sind erforderlich, um Ihre Bestellung korrekt zu bearbeiten und Ihnen ein präzises Angebot auszustellen." },
                { question: "Kann ich eine Bestellung telefonisch aufgeben?", answer: "Aufgrund begrenzter Kapazitäten bieten wir derzeit keine telefonische Bestellhotline an. Bestellungen können ausschließlich per E-Mail oder über unser Kontaktformular aufgegeben werden." },
                { question: "Wie lange dauert die Bearbeitung meiner Bestellung?", answer: "Ihre Bestellung wird in der Regel innerhalb weniger Stunden bearbeitet. Sollte eine Serverinstallation erforderlich sein, kann die Bearbeitungszeit auf 1 bis 3 Werktage verlängert werden." },
                { question: "Welche Zahlungsmethoden akzeptieren Sie?", answer: "Wir akzeptieren Zahlungen per Vorkasse und SEPA-Lastschrift. Zahlungen per Lastschrift erfolgen über unseren Zahlungsdienstleister GoCardless. Nach der Bestellung erhalten Sie weitere Informationen zur Zahlungsabwicklung." },
                { question: "Kann ich meine Bestellung ändern oder stornieren?", answer: "Änderungen an Ihrer Bestellung sind möglich, solange der Bestellprozess noch nicht abgeschlossen ist. Nach Abschluss des Bestellprozesses ist eine Stornierung jedoch nicht mehr möglich." },
                { question: "Erhalte ich eine Bestellbestätigung?", answer: "Nach Abschluss der Bestellung erhalten Sie ein Angebot, das alle Details Ihrer Bestellung sowie Informationen zum weiteren Vorgehen enthält." },
                { question: "Wie wird die Einrichtung des CloudPBX-Systems nach der Bestellung durchgeführt?", answer: "Nach der Bestellung kümmern wir uns um die Einrichtung Ihres CloudPBX-Systems. Die Installation ist im Preis enthalten. Sollten Sie Unterstützung bei der Konfiguration benötigen, können wir diese gerne gegen eine zusätzliche Gebühr anbieten." },
                { question: "Kann ich eine Testversion vor der Bestellung anfordern?", answer: "Wir bieten das 3CX SMB Free Paket an, eine kostenlose Variante unserer CloudPBX-Lösung mit eingeschränkten Funktionen. Diese ist jedoch nicht für den professionellen und dauerhaften Einsatz geeignet." },
                { question: "Gibt es Rabatte oder Sonderangebote für größere Bestellungen?", answer: "Leider bieten wir keine Rabatte oder Sonderangebote an. Dafür profitieren Sie von einem herausragenden Support, der sich wirklich sehen lassen kann!" }
            ]
        },
    ];

    let currentCategory = null;
  let currentQuestionIndex = 0;

  function displayCategories() {
    addMessage("Wählen Sie ein Thema aus:", "bot");

    categories.forEach(category => {
      const categoryButton = document.createElement('button');
      categoryButton.textContent = category.name;
      categoryButton.classList.add('chatbox-answer');
      categoryButton.addEventListener('click', function() {
        currentCategory = category;
        chatboxMessages.innerHTML = '';
        displayQuestions();
      });
      chatboxMessages.appendChild(categoryButton);
    });

    // Scrollen zum Anfang
    setTimeout(() => {
      chatboxMessages.scrollTop = 0;
    }, 0);
  }

  function displayQuestions() {
    if (!currentCategory) return;

    addMessage("Wählen Sie Ihre Frage aus:", "bot");

    currentCategory.questions.forEach((question, index) => {
      const questionButton = document.createElement('button');
      questionButton.textContent = question.question;
      questionButton.classList.add('chatbox-answer');
      questionButton.addEventListener('click', function() {
        clearChat();
        addMessage(question.question, "user");
        addMessage(question.answer, "bot");
        currentQuestionIndex = index;
        displayNextActions();
      });
      chatboxMessages.appendChild(questionButton);
    });

    setTimeout(() => {
      chatboxMessages.scrollTop = 0;
    }, 0);
  }

  function displayNextActions() {
    const nextActionButtons = document.createElement('div');

    const continueButton = document.createElement('button');
    continueButton.textContent = 'Ich habe weitere Fragen zu diesem Thema.';
    continueButton.classList.add('chatbox-answer');
    continueButton.addEventListener('click', function() {
      clearChat();
      currentQuestionIndex = 0;
      displayQuestions();
    });

    const newCategoryButton = document.createElement('button');
    newCategoryButton.textContent = 'Ich habe Fragen zu einem anderen Thema.';
    newCategoryButton.classList.add('chatbox-answer');
    newCategoryButton.addEventListener('click', function() {
      clearChat();
      displayCategories();
    });

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Ich möchte eine Bestellung aufgeben.';
    orderButton.classList.add('chatbox-answer');
    orderButton.addEventListener('click', function() {
      window.location.href = 'mailto:support@bitblade.io';
      clearChat();
      displayCategories();
    });

    const endButton = document.createElement('button');
    endButton.textContent = 'Ich habe keine weiteren Fragen.';
    endButton.classList.add('chatbox-answer');
    endButton.addEventListener('click', function() {
      clearChat();
      addMessage('Möchten Sie den Chat wirklich beenden?', 'bot');
      addEndConfirmationButtons();
    });

    // Spezielle Optionen (je nach Kategorie, ggf. anpassbar)
    if (currentCategory.name === "Kosten und Preisgestaltung" && currentQuestionIndex === 0) {
      addSpecialOption(nextActionButtons, 'Ja, zu den Preisen.', '/preise');
    } else if (currentCategory.name === "Funktionen und Features" && [1, 2].includes(currentQuestionIndex)) {
      addSpecialOption(nextActionButtons, 'Ja, zur umfangreichen Funktionsliste', '/funktionen');
    }

    nextActionButtons.appendChild(continueButton);
    nextActionButtons.appendChild(newCategoryButton);
    nextActionButtons.appendChild(orderButton);
    nextActionButtons.appendChild(endButton);
    chatboxMessages.appendChild(nextActionButtons);

    setTimeout(() => {
      chatboxMessages.scrollTop = 0;
    }, 0);
  }

  function addEndConfirmationButtons() {
    const confirmationButtons = document.createElement('div');

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Ja';
    yesButton.classList.add('chatbox-answer');
    yesButton.addEventListener('click', function() {
      chatbox.classList.remove('visible');
      clearChat();
    });

    const noButton = document.createElement('button');
    noButton.textContent = 'Nein';
    noButton.classList.add('chatbox-answer');
    noButton.addEventListener('click', function() {
      clearChat();
      displayCategories();
    });

    confirmationButtons.appendChild(yesButton);
    confirmationButtons.appendChild(noButton);
    chatboxMessages.appendChild(confirmationButtons);
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
  }

  function addSpecialOption(container, optionText, url) {
    const specialButton = document.createElement('button');
    specialButton.textContent = optionText;
    specialButton.classList.add('chatbox-answer');
    specialButton.addEventListener('click', function() {
      clearChat();
      addMessage(optionText, "user");
      window.open(url, '_blank');
      resetChat();
    });
    container.appendChild(specialButton);
  }

  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbox-message', sender);
    messageElement.textContent = message;
    chatboxMessages.appendChild(messageElement);
  }

  function clearChat() {
    chatboxMessages.innerHTML = '';
  }

  function resetChat() {
    currentCategory = null;
    currentQuestionIndex = 0;
    displayCategories();
  }

  closeChat.addEventListener('click', function() {
    clearChat();
    addMessage('Möchten Sie den Chat wirklich beenden?', 'bot');
    addEndConfirmationButtons();
  });

  // Chat-Initialisierung: Begrüßung und sofortige Anzeige der Kategorien (ohne Verzögerung)
  clearChat();
  addMessage("Hallo, ich bin der PBXAssistent! Ich beantworte Ihnen gerne alle Fragen rund um unsere Produkte!", "bot");
  displayCategories();
});
